---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "JSQUEL"
  text: "A lightweight SQL engine with file-based storage."
  tagline: "A SQL engine, built for JavaScript."
  image:
    src: /hero-image.png
    alt: "3D database storage cylinders with JavaScript badge"
  actions:
    - theme: brand
      text: Quickstart
      link: /quickstart
    - theme: alt
      text: Guide
      link: /guide/
    - theme: alt
      text: API Reference
      link: /api
    - theme: alt
      text: GitHub
      link: https://github.com/abhinavthedev/jsquel

features:
  - icon:
      src: /file-storage.svg
    title: File-Based Storage
    details: Store your data in transparent JSON files per table, making backups, version control, and manual inspection effortless.
  - icon: 
      src: /sqlite.svg
    title: SQLite-Like Syntax
    details: Use familiar SQL syntax compatible with SQLite queries, making adoption immediate if you already know SQL.
  - icon:
      src: /fast.svg
    title: Lightweight & Fast
    details: In-process execution with built-in column indexing for fast lookups without heavy database server daemons.
  - icon:
      src: /zero-deps.svg
    title: Zero External Dependencies
    details: Pure Node.js implementation utilizing standard filesystem modules without compiling native binary extensions.
  - icon:
      src: /lock.svg
    title: Concurrency & Table Locks
    details: Table-level Mutex locking prevents race conditions and data overwrites during asynchronous concurrent writes.
  - icon:
      src: /serverless.svg
    title: Serverless & Edge Ready
    details: Zero daemon startup latency and cold-start instantaneous execution, ideal for ephemeral serverless and edge workloads.
---

<HomeShowcase />
