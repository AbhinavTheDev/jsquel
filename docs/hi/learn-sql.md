# SQL सीखें (Learn SQL)

`jsquel` मानक SQLite-संगत सिंटैक्स का उपयोग करता है। यदि आप SQL में नए हैं या अपने क्वेरी कौशल को निखारना चाहते हैं, तो यहाँ सीखने की शैली के अनुसार वर्गीकृत निःशुल्क शिक्षण संसाधनों का एक क्यूरेटेड संग्रह दिया गया है।

इन प्लेटफ़ॉर्म्स पर आप जो कुछ भी अभ्यास करते हैं—बुनियादी `SELECT` कथनों से लेकर सशर्त फ़िल्टर, सॉर्टिंग और जॉइन तक—सीधे आपके `jsquel` अनुप्रयोगों में काम आता है।


## इंटरैक्टिव प्लेटफ़ॉर्म (Interactive)

ये प्लेटफ़ॉर्म आपको बिना किसी सेटअप के तुरंत सत्यापन के साथ सीधे अपने ब्राउज़र में क्वेरी लिखने और निष्पादित करने की सुविधा देते हैं।

### 🌟 SQLBolt <Badge type="tip" text="संपादक की पसंद" />

- **लिंक**: [sqlbolt.com](https://sqlbolt.com/)
- **किसके लिए सर्वोत्तम**: शुरुआती शिक्षार्थियों के लिए जो तत्काल क्वेरी फीडबैक के साथ संक्षिप्त, इंटरैक्टिव और व्यावहारिक पाठ चाहते हैं।
- **हम इसकी अनुशंसा क्यों करते हैं**: SQLBolt बुनियादी `SELECT` क्वेरीज़ से लेकर टेबल निर्माण और बाधाओं (constraints) तक के इंटरैक्टिव पाठों के माध्यम से कदम-दर-कदम आपका मार्गदर्शन करता है। क्योंकि JSQUEL मानक SQLite-संगत क्वेरीज़ का उपयोग करता है, इसलिए SQLBolt में आपके द्वारा अभ्यास किया गया कोड सीधे `jsquel` विधियों जैसे `select()`, `insertInto()` और `createTable()` में उपयोग किया जा सकता है।

### Select Star SQL

- **लिंक**: [selectstarsql.com](https://selectstarsql.com/)
- **किसके लिए सर्वोत्तम**: ऐसे शिक्षार्थी जो अमूर्त अभ्यासों के बजाय वास्तविक दुनिया के डेटा विश्लेषण और कहानी-आधारित दृष्टिकोण को प्राथमिकता देते हैं।
- **अवलोकन**: एक ओपन-सोर्स, इंटरैक्टिव पुस्तक जो शुरू से अंत तक वास्तविक दुनिया के डेटासेट प्रश्नों की जांच करके SQL अवधारणाओं को सिखाती है।

### SQLZoo

- **लिंक**: [sqlzoo.net](https://sqlzoo.net/)
- **किसके लिए सर्वोत्तम**: इंटरैक्टिव क्विज़ और आकलन के साथ चरण-दर-चरण अभ्यास।
- **अवलोकन**: सबसे पुराने और प्रतिष्ठित इंटरैक्टिव SQL अभ्यास प्लेटफ़ॉर्म में से एक, जो बुनियादी प्रश्नों से लेकर नेस्टेड जॉइन्स और एग्रीगेशन्स तक कई कठिनाई स्तरों में अभ्यास प्रदान करता है।


## सिंटैक्स गाइड्स (Syntax Guides)

जब आपको सिंटैक्स की त्वरित याद दिलाने की आवश्यकता हो, तो त्वरित संदर्भ पत्रक और सिंटैक्स आरेख।

### W3Schools SQL Tutorial

- **लिंक**: [w3schools.com/sql](https://www.w3schools.com/sql/)
- **किसके लिए सर्वोत्तम**: त्वरित सिंटैक्स संदर्भ और संक्षिप्त स्पष्टीकरण।
- **अवलोकन**: इंटरैक्टिव "Try It Yourself" स्क्रैचपैड के साथ प्रत्येक SQL कीवर्ड और स्टेटमेंट के लिए स्पष्ट संदर्भ पृष्ठ।

### SQLite Official Syntax Guide

- **लिंक**: [sqlite.org/lang.html](https://www.sqlite.org/lang.html/)
- **किसके लिए सर्वोत्तम**: आधिकारिक सिंटैक्स आरेख और कीवर्ड विनिर्देश।
- **अवलोकन**: SQLite क्वेरी सिंटैक्स के लिए आधिकारिक व्याकरण संदर्भ, जिस पर JSQUEL अपनी क्वेरी पार्सिंग को आधारित करता है।


## विस्तृत गाइड्स (In-Depth Guides)

डेटाबेस सिद्धांत, क्वेरी अनुकूलन (optimization), और वास्तविक दुनिया के उपयोग में गहराई से जाने के लिए संसाधन।

### Use The Index, Luke!

- **लिंक**: [use-the-index-luke.com](https://use-the-index-luke.com/)
- **किसके लिए सर्वोत्तम**: इंडेक्स, निष्पादन प्रदर्शन और डेटाबेस की आंतरिक कार्यप्रणाली को समझना।
- **अवलोकन**: डेवलपर्स के लिए डेटाबेस प्रदर्शन पर एक बेहतरीन गाइड। यह विस्तार से बताता है कि पर्दे के पीछे B-tree और हैश इंडेक्सिंग कैसे काम करती है—जो इसे JSQUEL के `createIndex()` और `searchWithIndex()` सुविधाओं के लिए एकदम उपयुक्त साथी बनाती है।

### Mode Analytics SQL Tutorial

- **लिंक**: [mode.com/sql-tutorial](https://mode.com/sql-tutorial/)
- **किसके लिए सर्वोत्तम**: मध्यवर्ती (intermediate) क्वेरीज़ और डेटा विश्लेषण तकनीकें।
- **अवलोकन**: विश्लेषकों और इंजीनियरों के लिए डिज़ाइन किया गया एक संरचित पाठ्यक्रम, जिसमें मध्यवर्ती फ़िल्टरिंग, डेटा हेरफेर (wrangling) और सब-क्वेरीज़ शामिल हैं।


## वीडियो पाठ्यक्रम (Video Courses)

देखकर और सुनकर सीखने वालों के लिए व्यापक वीडियो वॉक-थ्रू।

### freeCodeCamp: शुरुआत करने वालों के लिए SQL (SQL for Beginners)

---

<iframe width="100%" height="350" src="https://www.youtube.com/embed/HXV3zeQKqGY?si=mH0YU2z2sDlU_jSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


- **किसके लिए सर्वोत्तम**: शून्य से शुरू करके डेटाबेस बनाने तक का संपूर्ण दृश्य वॉकथ्रू।
- **अवलोकन**: रिलेशनल डेटाबेस सिद्धांत, स्कीमा डिज़ाइन, क्वेरीज़ और जॉइन्स को चरण-दर-चरण समझाने वाला पूरा 4 घंटे का व्यापक कोर्स।

### Harvard CS50: Intro to Databases with SQL

---

<iframe width="100%" height="350" src="https://www.youtube.com/embed/WXk7yDqsKxs?si=9z-ngFIX1SIBSCSN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


- **किसके लिए सर्वोत्तम**: निर्देशित वीडियो पाठ।
- **अवलोकन**: टेबल निर्माण, डेटा क्वेरी और आंकड़ों के एकत्रीकरण को कवर करने वाला आकर्षक, शुरुआती-उन्मुख पाठ्यक्रम।


## JSQUEL के साथ शुरुआत करें

एक बार जब आप [SQLBolt](https://sqlbolt.com/) या ऊपर दिए गए किसी भी संसाधन में मानक प्रश्नों के साथ सहज महसूस करने लगें, तो उन्हें `jsquel` में चलाना सीधा और सरल है:

```javascript
import { createTable, insertInto, select } from "jsquel";

// 1. टेबल बनाने का अभ्यास करें
createTable("CREATE TABLE books (id int, title txt, year int, available boolean)");

// 2. रिकॉर्ड डालने का अभ्यास करें
insertInto('INSERT INTO books (id, title, year, available) VALUES (1, "Clean Code", 2008, true)');
insertInto('INSERT INTO books (id, title, year, available) VALUES (2, "Design Patterns", 1994, false)');

// 3. शर्तों और छँटाई (filtering & sorting) के साथ क्वेरी करने का अभ्यास करें
select("SELECT title, year FROM books WHERE year > 2000");
```

प्रोजेक्ट बनाना शुरू करने के लिए तैयार हैं? सीधे [त्वरित शुरुआत (Quickstart)](/hi/quickstart) पर जाएं या [उदाहरण](/hi/guide/examples) देखें।
