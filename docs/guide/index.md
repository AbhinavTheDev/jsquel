# Getting Started

## Install

```bash
npm install jsquel
```

## Setup
Create a `.env` file in the project root:

```txt
MINI_SQL_DB_PATH="./database/"
```

## Example

```js
import { createTable, insertInto, selectFrom } from "jsquel";

createTable("CREATE TABLE users (id int, name txt)");
insertInto("INSERT INTO users (id, name) VALUES (1, 'Alice')");
console.log(selectFrom("SELECT * FROM users"));
```