---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "JSQUEL"
  text: "A lightweight SQL engine with file-based storage."
  tagline: "A SQL engine, built for JavaScript."
  image:
    src: /hero-image.png
    alt: "Hero Image Description"
  actions:
    - theme: brand
      text: Guide
      link: /guide/
    - theme: alt
      text: API
      link: /api
    - theme: alt
      text: Github
      link: https://github.com/abhinavthedev/jsquel

features:
  - icon: 📂
    title: File-Based Storage
    details: Store your data in a single file that's easy to backup, version control, and share with others.
  - icon: 
      src: /sqlite.svg
    title: SQLite-Like Syntax
    details: Use familiar SQL syntax that's compatible with SQLite queries, making it easy to adopt if you already know SQL.
  - icon: 🚀
    title: Lightweight & Fast
    details: Optimized for performance with a small footprint, perfect for applications where speed matters.
  - icon: ⚔️
    title: No External Dependencies
    details: Run JSQUEL directly in Node.js without needing to install additional database engines.
  - icon: 💱
    title: Transaction Support
    details: Full support for SQL transactions to ensure data integrity in complex operations.
  - icon:
      src: /serverless.svg
    title: Serverless Compatible
    details: Perfect for serverless environments, edge computing, or any JavaScript runtime.
---
