# त्वरित शुरुआत (Quick Start)

`jsquel` के साथ 60 सेकंड से भी कम समय में काम शुरू करें।


## 1. इंस्टॉल करें

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

सुनिश्चित करें कि ES मॉड्यूल समर्थन के लिए आपके `package.json` में `"type": "module"` शामिल हो:

```json
{
  "type": "module"
}
```


## 2. अपनी पहली स्क्रिप्ट लिखें

`quickstart.js` नाम से एक फ़ाइल बनाएं:

```js
import { createTable, insertInto, select } from "jsquel";

// कॉलम प्रकारों के साथ एक टेबल बनाएं
createTable("CREATE TABLE tasks (id int, title txt, completed boolean)");

// रिकॉर्ड्स डालें (Insert records)
insertInto('INSERT INTO tasks (id, title, completed) VALUES (1, "Install JSQUEL", true)');
insertInto('INSERT INTO tasks (id, title, completed) VALUES (2, "Write documentation", true)');
insertInto('INSERT INTO tasks (id, title, completed) VALUES (3, "Ship v1.0", false)');

// रिकॉर्ड्स को क्वेरी करें
select("SELECT * FROM tasks");
```


## 3. चलाएँ

::: code-group

```sh [node]
node quickstart.js
```

:::
### डिस्क पर क्या हुआ?
`jsquel` ने आपके प्रोजेक्ट रूट में स्वचालित रूप से एक `./database/` निर्देशिका बनाई जिसमें निम्न फ़ाइलें शामिल हैं:
- `tasks.schema.json`: टेबल कॉलम की परिभाषाएँ (`id`, `title`, `completed`)।
- `tasks.data.json`: संग्रहीत JSON रिकॉर्ड्स।


## अगले कदम

- [शुरुआत करें](/hi/guide/): कॉन्फ़िगरेशन विवरण के साथ पूरी गाइड।
- [उदाहरण](/hi/guide/examples): इंडेक्सिंग, टेबल लॉक्स और बैकअप।
- [एपीआई संदर्भ](/hi/api): सभी निर्यातित फ़ंक्शंस का पूरा संदर्भ।
- [SQL सीखें](/hi/learn-sql): SQL सिंटैक्स का अभ्यास करने के लिए निःशुल्क इंटरैक्टिव ट्यूटोरियल और गाइड (SQLBolt सहित)।
