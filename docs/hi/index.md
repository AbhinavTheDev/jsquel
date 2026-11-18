---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: JSQUEL (जेएसक्यूईएल) - हल्का जावास्क्रिप्ट SQL डेटाबेस (JS SQL)
titleTemplate: false
description: JSQUEL Node.js के लिए एक हल्का, शून्य-निर्भरता, फ़ाइल-आधारित जावास्क्रिप्ट SQL डेटाबेस (JS SQL) इंजन है। परिचित SQLite सिंटैक्स के साथ JSON फ़ाइलों को क्वेरी करें।

hero:
  name: "जेएसक्यूईएल"
  text: "हल्का जावास्क्रिप्ट SQL डेटाबेस (JS SQL)"
  tagline: "JavaScript और Node.js के लिए निर्मित शून्य-निर्भरता SQL डेटाबेस इंजन।"
  image:
    src: /hero-image.png
    alt: "JSQUEL - JavaScript बैज के साथ 3D डेटाबेस स्टोरेज सिलिंडर"
  actions:
    - theme: brand
      text: क्विकस्टार्ट
      link: /hi/quickstart
    - theme: alt
      text: गाइड
      link: /hi/guide/
    - theme: alt
      text: एपीआई संदर्भ
      link: /hi/api
    - theme: alt
      text: GitHub
      link: https://github.com/abhinavthedev/jsquel

features:
  - icon:
      src: /file-storage.svg
    title: फ़ाइल-आधारित स्टोरेज
    details: प्रत्येक टेबल के डेटा को पारदर्शी JSON फ़ाइलों में सहेजें, जिससे बैकअप, वर्ज़न कंट्रोल और मैन्युअल निरीक्षण बेहद आसान हो जाता है।
  - icon: 
      src: /sqlite.svg
    title: SQLite-जैसी सिंटैक्स
    details: SQLite क्वेरीज़ के अनुकूल परिचित SQL सिंटैक्स का उपयोग करें। यदि आप पहले से SQL जानते हैं, तो इसे तुरंत अपनाना सहज है।
  - icon:
      src: /fast.svg
    title: हल्का और तेज़
    details: बिना किसी भारी डेटाबेस सर्वर डेमन के, तेज़ लुकअप के लिए इन-प्रोसेस निष्पादन और अंतर्निहित कॉलम इंडेक्सिंग।
  - icon:
      src: /zero-deps.svg
    title: शून्य बाहरी निर्भरताएं
    details: बिना किसी नेटिव बाइनरी एक्सटेंशन को कंपाइल किए, मानक Node.js फ़ाइल सिस्टम मॉड्यूल का उपयोग करने वाला शुद्ध कार्यान्वयन।
  - icon:
      src: /lock.svg
    title: समवर्ती और टेबल लॉक्स
    details: टेबल-स्तरीय म्यूटिक्स (Mutex) लॉकिंग एसिंक्रोनस समवर्ती राइट्स के दौरान रेस कंडीशन्स और डेटा ओवरराइट्स को रोकती है।
  - icon:
      src: /serverless.svg
    title: सर्वरलेस और एज अनुकूल
    details: शून्य डेमन स्टार्टअप लेटेंसी और तुरंत कोल्ड-स्टार्ट निष्पादन, अल्पकालिक सर्वरलेस और एज वर्कलोड के लिए एकदम उपयुक्त।
---

<HomeShowcase />
