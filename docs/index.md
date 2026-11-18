---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: JSQUEL - Lightweight JavaScript SQL Database (JS SQL)
titleTemplate: false
description: JSQUEL is a lightweight, zero-dependency, file-based SQL database engine built in pure JavaScript (JS SQL) for Node.js. Run SQLite-compatible queries directly on JSON files.

hero:
  name: "JSQUEL"
  text: "Lightweight JavaScript SQL Database"
  tagline: "A zero-dependency JS SQL database engine with human-readable JSON storage for Node.js."
  image:
    src: /hero-image.png
    alt: "JSQUEL - JavaScript SQL Database cylinders and badge"
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
