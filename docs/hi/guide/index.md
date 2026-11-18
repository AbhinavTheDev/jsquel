# शुरुआत करें (Getting Started)

`jsquel` एक हल्का, फ़ाइल-आधारित SQL डेटाबेस है जिसे Node.js अनुप्रयोगों के लिए बनाया गया है। यह आपको स्कीमा परिभाषित करने, डेटा डालने और SQL सिंटैक्स के साथ टेबल क्वेरी करने की सुविधा देता है—और सब कुछ आपकी डिस्क पर आसानी से पढ़ी जा सकने वाली JSON फ़ाइलों में संग्रहीत करता है।


## 1. इंस्टॉलेशन

अपने पसंदीदा पैकेज मैनेजर के माध्यम से `jsquel` इंस्टॉल करें:

::: code-group

```bash [npm]
npm install jsquel
```

```bash [pnpm]
pnpm add jsquel
```

```bash [yarn]
yarn add jsquel
```

```bash [bun]
bun add jsquel
```

:::


## 2. प्रोजेक्ट सेटअप

`jsquel` को एक मानक ES मॉड्यूल के रूप में पैकेज किया गया है। सुनिश्चित करें कि आपके `package.json` में शामिल है:

```json
{
  "type": "module"
}
```

या Node.js `--experimental-modules` फ़्लैग अथवा `.mjs` एक्सटेंशन का उपयोग करके स्क्रिप्ट चलाएँ।



## 3. कॉन्फ़िगरेशन (वैकल्पिक)

डिफ़ॉल्ट रूप से, `jsquel` आपके प्रोजेक्ट रूट के सापेक्ष `./database/` में सभी टेबल फ़ाइलों को स्वचालित रूप से बनाता और संग्रहीत करता है।

डेटाबेस निर्देशिका को कस्टमाइज़ करने के लिए, अपनी `.env` फ़ाइल में `MINI_SQL_DB_PATH` परिभाषित करें:

```sh
MINI_SQL_DB_PATH="./my_data_folder/"
```

यदि निर्देशिका मौजूद नहीं है, तो `jsquel` स्टार्टअप पर इसे स्वचालित रूप से बना देता है।



## 4. बुनियादी उपयोग का उदाहरण

`app.js` नाम की एक स्क्रिप्ट बनाएं और SQL स्टेटमेंट्स चलाएं:

```js
import { createTable, insertInto, select, createIndex, searchWithIndex } from "jsquel";

// 1. एक टेबल बनाएं
createTable("CREATE TABLE users (id int, name txt, age int, student boolean)");

// 2. पंक्तियाँ (rows) डालें
insertInto('INSERT INTO users (id, name, age, student) VALUES (1, "Alice", 28, true)');
insertInto('INSERT INTO users (id, name, age, student) VALUES (2, "Bob", 24, false)');

// 3. सभी पंक्तियों को क्वेरी करें
select("SELECT * FROM users");

// 4. तेज़ लुकअप के लिए किसी कॉलम को इंडेक्स करें
createIndex("users", "name");

// 5. इंडेक्स का उपयोग करके खोजें
const results = searchWithIndex("users", "name", "Alice");
console.log(results);
```



## अगले कदम

- [उदाहरण](/hi/guide/examples) में अधिक व्यावहारिक परिदृश्यों का अन्वेषण करें।
- [आर्किटेक्चर](/hi/guide/architecture) में फ़ाइल-आधारित स्थायित्व और टेबल लॉकिंग के बारे में जानें।
- [एपीआई संदर्भ](/hi/api) में सभी मेथड सिग्नेचर और त्रुटि विवरण देखें।
- क्यूरेटेड [SQL सीखें](/hi/learn-sql) संसाधनों के साथ SQL सिंटैक्स का अभ्यास करें या उसे दोहराएं।
