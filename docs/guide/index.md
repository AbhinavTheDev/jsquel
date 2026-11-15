# Getting Started

`jsquel` is a lightweight, file-based SQL database built for Node.js applications. It lets you define schemas, insert data, and query tables with SQL syntax—storing everything in human-readable JSON files on your disk.


## 1. Installation

Install `jsquel` via your preferred package manager:

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

## 2. Project Setup

`jsquel` is packaged as a standard ES module. Ensure your `package.json` contains:

```json
{
  "type": "module"
}
```

Or run scripts using Node.js `--experimental-modules` or `.mjs` extensions.



## 3. Configuration (Optional)

By default, `jsquel` automatically creates and stores all table files in `./database/` relative to your project root.

To customize the database directory, define `MINI_SQL_DB_PATH` in your `.env` file:

```sh
MINI_SQL_DB_PATH="./my_data_folder/"
```

If the directory does not exist, `jsquel` creates it automatically on startup.



## 4. Basic Usage Example

Create a script `app.js` and run SQL statements:

```js
import { createTable, insertInto, select, createIndex, searchWithIndex } from "jsquel";

// 1. Create a table
createTable("CREATE TABLE users (id int, name txt, age int, student boolean)");

// 2. Insert rows
insertInto('INSERT INTO users (id, name, age, student) VALUES (1, "Alice", 28, true)');
insertInto('INSERT INTO users (id, name, age, student) VALUES (2, "Bob", 24, false)');

// 3. Query all rows
select("SELECT * FROM users");

// 4. Index a column for fast lookups
createIndex("users", "name");

// 5. Search using the index
const results = searchWithIndex("users", "name", "Alice");
console.log(results);
```



## Next Steps

- Explore more hands-on scenarios in the [Examples](/guide/examples).
- Learn about file-based persistence and table locking in [Architecture](/guide/architecture).
- View full method signatures and error details in the [API Reference](/api).
- Practice or brush up on SQL syntax with curated [Learn SQL](/learn-sql) resources.
