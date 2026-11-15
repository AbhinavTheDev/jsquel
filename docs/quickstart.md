# Quick Start

Get up and running with `jsquel` in less than 60 seconds.


## 1. Install

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

Ensure your `package.json` includes `"type": "module"` for ES module support:

```json
{
  "type": "module"
}
```


## 2. Write Your First Script

Create a file named `quickstart.js`:

```js
import { createTable, insertInto, select } from "jsquel";

// Create a table with column types
createTable("CREATE TABLE tasks (id int, title txt, completed boolean)");

// Insert records
insertInto('INSERT INTO tasks (id, title, completed) VALUES (1, "Install JSQUEL", true)');
insertInto('INSERT INTO tasks (id, title, completed) VALUES (2, "Write documentation", true)');
insertInto('INSERT INTO tasks (id, title, completed) VALUES (3, "Ship v1.0", false)');

// Query the records
select("SELECT * FROM tasks");
```


## 3. Run

::: code-group

```sh [node]
node quickstart.js
```

:::
### What Happened on Disk?
`jsquel` automatically created a `./database/` directory in your project root containing:
- `tasks.schema.json`: The table column definitions (`id`, `title`, `completed`).
- `tasks.data.json`: The stored JSON records.


## Next Steps

- [Getting Started](/guide/): Full guide with configuration details.
- [Examples](/guide/examples): Indexing, table locks, and backups.
- [API Reference](/api): Full reference for all exported functions.
- [Learn SQL](/learn-sql): Free interactive tutorials and guides (featuring SQLBolt) to practice SQL syntax.
