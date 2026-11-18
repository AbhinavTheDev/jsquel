# एपीआई संदर्भ (API Reference)

`jsquel` फ़ाइल-आधारित JSON स्थायित्व के साथ JavaScript रनटाइम में सीधे SQL संचालन निष्पादित करने के लिए डिज़ाइन किए गए मॉड्यूलर फ़ंक्शंस प्रस्तुत करता है।

सभी फ़ंक्शंस सीधे पैकेज एंट्रीपॉइंट से ES मॉड्यूल के रूप में निर्यात किए जाते हैं:

```js
import {
  // स्कीमा
  createTable,
  // क्वेरीज़
  insertInto,
  select,
  // इंडेक्सिंग
  createIndex,
  searchWithIndex,
  // लॉक्स और समवर्ती
  performWithLock,
  lockTable,
  // बैकअप और पुनर्प्राप्ति
  backupDatabase,
  restoreDatabase,
  // स्टोरेज यूटिलिटीज़
  getTableFilePath,
  readJSON,
  writeJSON
} from "jsquel";
```


## स्कीमा प्रबंधन (Schema Management)

### `createTable(query)`

एक नई टेबल स्कीमा फ़ाइल बनाता है और रिकॉर्ड संग्रहीत करने के लिए एक खाली डेटा सरणी (data array) आरंभ करता है।

```ts
function createTable(query: string): void
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `query` | `string` | हाँ | टेबल का नाम और कॉलम के प्रकारों को परिभाषित करने वाली एक SQL `CREATE TABLE` क्वेरी स्ट्रिंग। |

#### समर्थित सिंटैक्स
```sql
CREATE TABLE <tableName> (<columnName> <type>, <columnName> <type>, ...)
```

#### कॉलम प्रकार (Column Types)
- `INT` / `INTEGER`: संख्यात्मक पूर्णांक मान (Numeric integer values)।
- `TXT` / `TEXT`: स्ट्रिंग / टेक्स्ट मान (String / text values)।
- `BOOLEAN`: बूलियन सत्य/असत्य मान (Boolean true/false values)।

#### स्टोरेज प्रभाव (Storage Impact)
`DATABASE_PATH` में दो JSON फ़ाइलें उत्पन्न करता है:
1. `<tableName>.schema.json`: कॉलम परिभाषाओं को `{ columnName: TYPE }` के रूप में संग्रहीत करता है।
2. `<tableName>.data.json`: `[]` (खाली पंक्ति संग्रह) के रूप में आरंभ किया जाता है।

#### संभावित त्रुटियाँ (Errors Thrown)
- यदि क्वेरी SQL पैटर्न से मेल नहीं खाती है, तो `Error("Invalid CREATE TABLE query")` फेंकता है।
- `tables` या `columns` (आरक्षित नाम) नाम की टेबल बनाने पर `Error("Cannot create a table named 'tables'")` या `'columns'` फेंकता है।
- यदि कॉलम परिभाषाओं में नाम या प्रकार का अभाव है, तो `Error("Invalid schema definition")` फेंकता है।

#### उदाहरण
```js
import { createTable } from "jsquel";

createTable("CREATE TABLE users (id int, name txt, age int, student boolean)");
```


## क्वेरीज़ (Queries)

### `insertInto(query)`

मौजूदा टेबल में एक नया रिकॉर्ड डालता है। आने वाले कॉलमों को स्वचालित रूप से मान्य करता है और पंजीकृत टेबल स्कीमा के विरुद्ध प्रकारों को कास्ट करता है।

```ts
function insertInto(query: string): void
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `query` | `string` | हाँ | कॉलम के नाम और मान लिटरल्स वाली एक SQL `INSERT INTO` क्वेरी स्ट्रिंग। |

#### समर्थित सिंटैक्स
```sql
INSERT INTO <tableName> (<col1>, <col2>, ...) VALUES (<val1>, <val2>, ...)
```

#### टाइप कास्टिंग और सत्यापन (Type Casting & Validation)
- स्कीमा में `INT` के रूप में घोषित कॉलम `parseInt(val, 10)` के माध्यम से परिवर्तित किए जाते हैं।
- स्ट्रिंग मानों के आसपास के कोट्स (`'` या `"`) को लिखने से पहले हटा दिया जाता है।
- यह सत्यापित करता है कि प्रत्येक डाला गया कॉलम `<tableName>.schema.json` में मौजूद है।

#### संभावित त्रुटियाँ (Errors Thrown)
- यदि क्वेरी पैटर्न विकृत है, तो `Error("Invalid INSERT INTO query")` फेंकता है।
- यदि स्कीमा या डेटा फ़ाइलें अनुपलब्ध हैं, तो `Error('Table "<tableName>" does not exist')` फेंकता है।
- अघोषित कॉलम के लिए `Error('Column "<col>" does not exist in table "<tableName>"')` फेंकता है।

#### उदाहरण
```js
import { insertInto } from "jsquel";

insertInto('INSERT INTO users (id, name, age, student) VALUES (1, "Alice", 28, true)');
```


### `select(query)`

टेबल के संग्रहीत रिकॉर्ड्स में `SELECT` स्टेटमेंट निष्पादित करता है और सारणीबद्ध आउटपुट प्रदर्शित करता है।

```ts
function select(query: string): void
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `query` | `string` | हाँ | अनुमानित कॉलम और लक्ष्य टेबल को परिभाषित करने वाली SQL `SELECT` क्वेरी स्ट्रिंग। |

#### समर्थित सिंटैक्स
```sql
SELECT <col1>, <col2> FROM <tableName>
SELECT * FROM <tableName>
```

#### संभावित त्रुटियाँ (Errors Thrown)
- यदि क्वेरी पैटर्न अमान्य है, तो `Error("Invalid SELECT query")` फेंकता है।
- यदि लक्षित टेबल डेटा फ़ाइल नहीं मिलती है, तो `Error('Table "<tableName>" does not exist')` फेंकता है।

#### उदाहरण
```js
import { select } from "jsquel";

// विशिष्ट कॉलम चुनें
select("SELECT id, name FROM users");

// सभी कॉलम चुनें
select("SELECT * FROM users");
```


## इंडेक्सिंग और तेज़ लुकअप (Indexing & Fast Lookups)

`jsquel` पूर्ण टेबल स्कैन की आवश्यकता के बिना बड़े JSON डेटासेट पर लुकअप को गति देने के लिए कॉलम इंडेक्सिंग का समर्थन करता है।

### `createIndex(tableName, column)`

कॉलम मानों को पंक्ति सरणी स्थितियों (row array positions) में मैप करने वाला एक इनवर्टेड इंडेक्स बनाता है और इसे एक समर्पित इंडेक्स फ़ाइल के रूप में संग्रहीत करता है।

```ts
function createIndex(tableName: string, column: string): void
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | हाँ | लक्षित टेबल का नाम। |
| `column` | `string` | हाँ | इंडेक्स किया जाने वाला कॉलम। |

#### स्टोरेज प्रभाव (Storage Impact)
इंडेक्स डिक्शनरी युक्त `<tableName>.<column>.index.json` उत्पन्न करता है:
```json
{
  "Alice": [0],
  "Bob": [1, 4]
}
```

#### संभावित त्रुटियाँ (Errors Thrown)
- यदि टेबल डेटा फ़ाइल मौजूद नहीं है, तो `Error('Table "<tableName>" does not exist')` फेंकता है।

#### उदाहरण
```js
import { createIndex } from "jsquel";

createIndex("users", "name");
createIndex("users", "age");
```


### `searchWithIndex(tableName, column, value)`

विशिष्ट कॉलम मान से मेल खाने वाले रिकॉर्ड्स के लिए एक $O(1)$ इंडेक्स लुकअप करता है।

```ts
function searchWithIndex(tableName: string, column: string, value: string | number | boolean): Array<Record<string, any>>
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | हाँ | खोजी जाने वाली टेबल का नाम। |
| `column` | `string` | हाँ | मिलान करने के लिए अनुक्रमित (indexed) कॉलम। |
| `value` | `string \| number \| boolean` | हाँ | खोजने के लिए लक्षित मान। |

#### रिटर्न मान (Return Value)
- `Array<Record<string, any>>`: सीधे `<tableName>.data.json` से प्राप्त मेल खाने वाले पंक्ति ऑब्जेक्ट्स की एक सरणी (array)।

#### संभावित त्रुटियाँ (Errors Thrown)
- यदि टेबल मौजूद नहीं है, तो `Error('Table "<tableName>" does not exist')` फेंकता है।
- यदि इंडेक्स नहीं बनाया गया है, तो `Error('Index on column "<column>" of table "<tableName>" does not exist')` फेंकता है।
- यदि कुंजी इंडेक्स में नहीं है, तो `Error('No matching rows found for value: "<value>" in table "<tableName>"')` फेंकता है।

#### उदाहरण
```js
import { searchWithIndex } from "jsquel";

const matches = searchWithIndex("users", "name", "Alice");
console.log(matches);
// आउटपुट: [ { id: 1, name: "Alice", age: 28, student: true } ]
```


## समवर्ती और टेबल लॉक्स (Concurrency & Table Locks)

एसिंक्रोनस और सर्वरलेस वातावरण में सुरक्षित समवर्ती राइट संचालन की गारंटी देने के लिए, `jsquel` रेस कंडीशन्स को समाप्त करने और डेडलॉक्स से बचने के लिए टेबल-स्तरीय म्यूटिक्स (Mutex) लॉकिंग प्रदान करता है।

### `performWithLock(tableName, callback)`

`tableName` पर एक एक्सक्लूसिव लॉक प्राप्त करता है, एक एसिंक्रोनस कॉलबैक ऑपरेशन निष्पादित करता है, और पूरा होने या विफलता पर `finally` ब्लॉक में लॉक रिलीज़ की गारंटी देता है।

```ts
function performWithLock<T>(tableName: string, callback: () => Promise<T> | T): Promise<T>
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | हाँ | एक्सक्लूसिव लॉक प्राप्त करने के लिए लक्षित टेबल। |
| `callback` | `() => Promise<T> \| T` | हाँ | राइट संचालन युक्त एसिंक्रोनस फ़ंक्शन। |

#### रिटर्न मान (Return Value)
- `Promise<T>`: टेबल लॉक जारी करने के बाद कॉलबैक के रिटर्न मान के साथ रिज़ॉल्व होता है।

#### उदाहरण
```js
import { performWithLock, insertInto } from "jsquel";

await performWithLock("users", async () => {
  insertInto('INSERT INTO users (id, name, age, student) VALUES (101, "Dave", 32, false)');
  insertInto('INSERT INTO users (id, name, age, student) VALUES (102, "Emma", 29, true)');
});
```


### `lockTable(tableName)`

किसी टेबल पर मैन्युअल रूप से म्यूटिक्स लॉक प्राप्त करने के लिए लो-लेवल प्रिमिटिव।

```ts
function lockTable(tableName: string): Promise<() => void>
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | हाँ | लॉक करने के लिए टेबल का नाम। |

#### रिटर्न मान (Return Value)
- `Promise<() => void>`: एक `unlock` रिलीज़ फ़ंक्शन देता है जिसे क्रिटिकल सेक्शन समाप्त होने पर कॉल किया जाना चाहिए।

#### उदाहरण
```js
import { lockTable, insertInto } from "jsquel";

const unlock = await lockTable("users");
try {
  insertInto('INSERT INTO users (id, name, age, student) VALUES (105, "Frank", 41, false)');
} finally {
  unlock();
}
```


## बैकअप और पुनर्प्राप्ति (Backup & Recovery)

विभिन्न परिवेशों में डेटाबेस फ़ाइलों को सुरक्षित रूप से डुप्लिकेट या पुनर्स्थापित करने के लिए `jsquel` में अंतर्निहित स्नैपशॉट बैकअप और रीस्टोर क्षमताएं शामिल हैं।

### `backupDatabase(backupPath)`

सक्रिय `DATABASE_PATH` से सभी डेटाबेस फ़ाइलों (स्कीमा, डेटा और इंडेक्स फ़ाइलों) को गंतव्य फ़ोल्डर में कॉपी करता है। यदि बैकअप निर्देशिका मौजूद नहीं है, तो उसे स्वचालित रूप से बनाता है।

```ts
function backupDatabase(backupPath: string): void
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `backupPath` | `string` | हाँ | गंतव्य निर्देशिका पथ जहाँ बैकअप फ़ाइलें संग्रहीत की जाएंगी। |

#### उदाहरण
```js
import { backupDatabase } from "jsquel";

backupDatabase("./backups/2026-11-15");
```

### `restoreDatabase(backupPath)`

एक बैकअप निर्देशिका से सक्रिय `DATABASE_PATH` में डेटाबेस फ़ाइलों को पुनर्स्थापित करता है, और मेल खाने वाली टेबल फ़ाइलों को अधिलेखित (overwrite) करता है।

```ts
function restoreDatabase(backupPath: string): void
```

#### पैरामीटर्स

| पैरामीटर | प्रकार | आवश्यक | विवरण |
| :--- | :--- | :--- | :--- |
| `backupPath` | `string` | हाँ | बैकअप की गई JSON फ़ाइलों वाली स्रोत निर्देशिका। |

#### संभावित त्रुटियाँ (Errors Thrown)
- यदि निर्दिष्ट बैकअप पथ नहीं मिल पाता है, तो `Error("Backup directory does not exist")` फेंकता है।

#### उदाहरण
```js
import { restoreDatabase } from "jsquel";

restoreDatabase("./backups/2026-11-15");
```


## स्टोरेज और लो-लेवल यूटिलिटीज (Storage & Low-Level Utilities)

कस्टम टूल्स या प्रशासनिक स्क्रिप्ट के लिए `jsquel` की आंतरिक स्टोरेज लेयर तक सीधी पहुँच।

### `getTableFilePath(tableName, fileType)`

`DATABASE_PATH` के आधार पर टेबल के स्कीमा, डेटा या इंडेक्स फ़ाइल के लिए पूर्णतः योग्य फ़ाइल सिस्टम पथ उत्पन्न करता है।

```ts
function getTableFilePath(tableName: string, fileType?: string): string
```

- डिफ़ॉल्ट `fileType` `"data"` है।
- `${DATABASE_PATH}/${tableName}.${fileType}.json` लौटाता है।


### `readJSON(filePath)`

डिस्क से एक JSON फ़ाइल को सुरक्षित रूप से पार्स करता है। यदि फ़ाइल मौजूद नहीं है, तो `null` लौटाता है और त्रुटि लॉग करता है।

```ts
function readJSON<T = any>(filePath: string): T | null
```


### `writeJSON(filePath, data)`

डेटा को स्वरूपित JSON (`null, 2`) में सीरियलाइज़ करता है और इसे समकालिक (synchronously) रूप से डिस्क पर लिखता है।

```ts
function writeJSON(filePath: string, data: any): void
```
