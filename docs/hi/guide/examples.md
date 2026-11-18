# उदाहरण (Examples)

यह पृष्ठ `jsquel` के सामान्य उपयोग पैटर्न को प्रदर्शित करता है, जिसमें बुनियादी स्कीमा निर्माण और रिकॉर्ड प्रविष्टि से लेकर इंडेक्सिंग, समवर्ती नियंत्रण (concurrency control) और डेटाबेस स्नैपशॉट शामिल हैं।


## 1. टेबल बनाना

कॉलम के नाम और प्रकार (`INT`, `TXT`, `BOOLEAN`) निर्दिष्ट करके टेबल स्कीमा परिभाषित करें:

```js
import { createTable } from "jsquel";

createTable("CREATE TABLE products (id int, name txt, quantity int, in_stock boolean)");
```

यह निम्नलिखित फ़ाइलें बनाता है:
- कॉलम परिभाषाओं के साथ `products.schema.json`।
- एक खाली संग्रह `[]` के रूप में आरंभ की गई `products.data.json` फ़ाइल।


## 2. रिकॉर्ड्स डालना

मानक SQL `INSERT INTO` सिंटैक्स का उपयोग करके पंक्तियाँ डालें:

```js
import { insertInto } from "jsquel";

insertInto(
  'INSERT INTO products (id, name, quantity, in_stock) VALUES (101, "Apple", 50, true)'
);

insertInto(
  'INSERT INTO products (id, name, quantity, in_stock) VALUES (102, "Banana", 85, true)'
);

insertInto(
  'INSERT INTO products (id, name, quantity, in_stock) VALUES (103, "Orange", 0, false)'
);
```

> **नोट**: पूर्णांक (Integer) कॉलम स्वचालित रूप से संख्यात्मक मानों में पार्स हो जाते हैं, और स्ट्रिंग लिटरल्स के आसपास लगे कोट्स को डिस्क पर सहेजने से पहले हटा दिया जाता है।


## 3. रिकॉर्ड्स क्वेरी करना

`select` का उपयोग करके किसी टेबल से रिकॉर्ड प्रदर्शित करें:

```js
import { select } from "jsquel";

// सभी कॉलम क्वेरी करें
select("SELECT * FROM products");

// विशिष्ट कॉलम क्वेरी करें
select("SELECT id, name FROM products");
```


## 4. तेज़ लुकअप के लिए इंडेक्सिंग

कई पंक्तियों वाली तालिकाओं के लिए, पूरी टेबल को स्कैन करने से बचने हेतु बार-बार क्वेरी किए जाने वाले कॉलम पर एक इंडेक्स बनाएं:

```js
import { createIndex, searchWithIndex } from "jsquel";

// 1. "name" कॉलम पर इंडेक्स बनाएं
createIndex("products", "name");

// 2. O(1) इंडेक्स लुकअप करें
const items = searchWithIndex("products", "name", "Banana");
console.log(items);
```

आउटपुट:

```json
[
  {
    "id": 102,
    "name": "Banana",
    "quantity": 85,
    "in_stock": true
  }
]
```


## 5. टेबल लॉक्स के साथ समवर्ती राइट्स

सर्वरलेस हैंडलर या एसिंक्रोनस इवेंट लूप में, एक ही टेबल में एक साथ लिखने वाले कई ऑपरेशन रेस कंडीशन (race conditions) पैदा कर सकते हैं। राइट्स को सुरक्षित रूप से क्रमित (serialize) करने के लिए `performWithLock` का उपयोग करें:

```js
import { performWithLock, insertInto } from "jsquel";

async function addProductConcurrently(id, name, quantity) {
  await performWithLock("products", async () => {
    insertInto(
      `INSERT INTO products (id, name, quantity, in_stock) VALUES (${id}, "${name}", ${quantity}, true)`
    );
  });
}

// समवर्ती ऑपरेशन्स को सुरक्षित रूप से निष्पादित करें
await Promise.all([
  addProductConcurrently(104, "Mango", 40),
  addProductConcurrently(105, "Pineapple", 25)
]);
```


## 6. डेटाबेस का बैकअप और रिस्टोर करना

सभी तालिकाओं और स्कीमा के पॉइंट-इन-टाइम स्नैपशॉट बनाएं, या किसी पिछले बैकअप को पुनर्स्थापित (restore) करें:

```js
import { backupDatabase, restoreDatabase } from "jsquel";

// ./backups निर्देशिका में स्नैपशॉट बनाएं
backupDatabase("./backups/weekly_snapshot");

// स्नैपशॉट निर्देशिका से डेटाबेस पुनर्स्थापित करें
restoreDatabase("./backups/weekly_snapshot");
```


## 7. संपूर्ण एंड-टू-एंड वर्कफ़्लो

स्कीमा परिभाषा, डेटा पॉपुलेशन, इंडेक्सिंग और बैकअप को एक साथ जोड़ने वाली संपूर्ण स्क्रिप्ट:

```js
import {
  createTable,
  insertInto,
  select,
  createIndex,
  searchWithIndex,
  backupDatabase
} from "jsquel";

// चरण 1: स्कीमा आरंभ करें
createTable("CREATE TABLE employees (id int, name txt, department txt, active boolean)");

// चरण 2: कर्मचारी रिकॉर्ड्स डालें
insertInto('INSERT INTO employees (id, name, department, active) VALUES (1, "Sarah", "Engineering", true)');
insertInto('INSERT INTO employees (id, name, department, active) VALUES (2, "Michael", "Design", true)');
insertInto('INSERT INTO employees (id, name, department, active) VALUES (3, "Elena", "Engineering", false)');

// चरण 3: रिकॉर्ड्स प्रिंट करें
select("SELECT * FROM employees");

// चरण 4: department कॉलम को इंडेक्स करें
createIndex("employees", "department");

// चरण 5: इंडेक्स के माध्यम से खोजें
const engineers = searchWithIndex("employees", "department", "Engineering");
console.log("खोजे गए इंजीनियर्स:", engineers);

// चरण 6: बैकअप स्नैपशॉट बनाएं
backupDatabase("./backups/employees_init");
```
