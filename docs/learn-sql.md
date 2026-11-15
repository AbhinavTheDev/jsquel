# Learn SQL

`jsquel` uses standard SQLite-compatible syntax. If you are new to SQL or want to sharpen your querying skills, here is a curated collection of free learning resources categorized by learning style.

Everything you practice on these platforms—from basic `SELECT` statements to conditional filters, sorting, and joins—transfers directly to your `jsquel` applications.


## Interactive

These platforms let you write and execute queries directly in your browser with instant validation—no setup required.

### 🌟 SQLBolt <Badge type="tip" text="Editor's Pick" />

- **Link**: [sqlbolt.com](https://sqlbolt.com/)
- **Best for**: Beginners who want short, interactive, hands-on lessons with immediate query feedback.
- **Why we recommend it**: SQLBolt guides you step-by-step through interactive lessons from basic `SELECT` queries to table creation and constraints. Because JSQUEL uses standard SQLite-compatible queries, code you practice in SQLBolt can be pasted directly into `jsquel` methods like `select()`, `insertInto()`, and `createTable()`.

### Select Star SQL

- **Link**: [selectstarsql.com](https://selectstarsql.com/)
- **Best for**: Learners who prefer story-driven, real-world data analysis rather than abstract exercises.
- **Overview**: An open-source, interactive book that teaches SQL concepts by investigating real-world dataset questions from start to finish.

### SQLZoo

- **Link**: [sqlzoo.net](https://sqlzoo.net/)
- **Best for**: Step-by-step practice with interactive quizzes and assessments.
- **Overview**: One of the original interactive SQL practice platforms, offering exercises across multiple difficulty tiers from basic queries to nested joins and aggregations.


## Syntax Guides

Quick lookup sheets and syntax diagrams when you need a fast syntax reminder.

### W3Schools SQL Tutorial

- **Link**: [w3schools.com/sql](https://www.w3schools.com/sql/)
- **Best for**: Quick syntax references and bite-sized explanations.
- **Overview**: Clean reference pages for every SQL keyword and statement, complete with an interactive "Try It Yourself" scratchpad.

### SQLite Official Syntax Guide

- **Link**: [sqlite.org/lang.html](https://www.sqlite.org/lang.html/)
- **Best for**: Authoritative syntax diagrams and keyword specifications.
- **Overview**: The official grammar reference for SQLite query syntax, which JSQUEL models its query parsing after.


## In-Depth Guides

Resources for going deeper into database theory, query optimization, and real-world usage.

### Use The Index, Luke!

- **Link**: [use-the-index-luke.com](https://use-the-index-luke.com/)
- **Best for**: Understanding indexes, execution performance, and database internals.
- **Overview**: A guide to database performance for developers. It explains exactly how B-tree and hash indexing work under the hood—making it a perfect companion to JSQUEL's `createIndex()` and `searchWithIndex()` features.

### Mode Analytics SQL Tutorial

- **Link**: [mode.com/sql-tutorial](https://mode.com/sql-tutorial/)
- **Best for**: Intermediate queries and data analysis techniques.
- **Overview**: A structured curriculum designed for analysts and engineers, covering intermediate filtering, data wrangling, and subqueries.


## Video Courses

Comprehensive video walk-throughs for visual and auditory learners.

### freeCodeCamp: SQL for Beginners

---

<iframe width="100%" height="350" src="https://www.youtube.com/embed/HXV3zeQKqGY?si=mH0YU2z2sDlU_jSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


- **Best for**: Complete visual walkthrough from zero to building a database.
- **Overview**: A full 4-hour comprehensive course explaining relational database theory, schema design, queries, and joins step-by-step.

### Harvard CS50: Intro to Databases with SQL

---

<iframe width="100%" height="350" src="https://www.youtube.com/embed/WXk7yDqsKxs?si=9z-ngFIX1SIBSCSN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


- **Best for**: Guided video lesson.
- **Overview**: Engaging, beginner-oriented course covering table creation, data querying, and aggregating statistics.


## Start with JSQUEL

Once you feel comfortable with standard queries in [SQLBolt](https://sqlbolt.com/) or any of the resources above, running them in `jsquel` is straightforward:

```javascript
import { createTable, insertInto, select } from "jsquel";

// 1. Practice creating tables
createTable("CREATE TABLE books (id int, title txt, year int, available boolean)");

// 2. Practice inserting records
insertInto('INSERT INTO books (id, title, year, available) VALUES (1, "Clean Code", 2008, true)');
insertInto('INSERT INTO books (id, title, year, available) VALUES (2, "Design Patterns", 1994, false)');

// 3. Practice querying with conditions and sorting
select("SELECT title, year FROM books WHERE year > 2000");
```

Ready to start building? Jump right into the [Quickstart](/quickstart) or explore the [Examples](/guide/examples).
