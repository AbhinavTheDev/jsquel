# Examples

This page shows a few common usage examples for `jsquel`.

## Create a table

```js
import { createTable } from "jsquel";

createTable("CREATE TABLE products (id int, name txt, quantity int)");
```

This creates a table named products with three columns:

- `id` as integer
- `name` as text
- `quantity` as integer

## Insert rows

```js
import { insertInto } from "jsquel";

insertInto("INSERT INTO products (id, name, quantity) VALUES (101, 'Apple', 10)");
insertInto("INSERT INTO products (id, name, quantity) VALUES (102, 'Banana', 15)");
insertInto("INSERT INTO products (id, name, quantity) VALUES (103, 'Orange', 20)");
```

## Read rows

```js
import { selectFrom } from "jsquel";

const rows = selectFrom("SELECT * FROM products");
console.log(rows);
```

Output:

```
[
  { id: 101, name: "Apple", quantity: 10 },
  { id: 102, name: "Banana", quantity: 15 },
  { id: 103, name: "Orange", quantity: 20 }
]
```

## Filter results

```js
import { selectFrom } from "jsquel";

const filtered = selectFrom("SELECT * FROM products WHERE quantity > 12");
console.log(filtered);
```

Output:

```js
[
  { id: 102, name: "Banana", quantity: 15 },
  { id: 103, name: "Orange", quantity: 20 }
]
```

## Update a row

```js
import { updateTable } from "jsquel";

updateTable("UPDATE products SET quantity = 25 WHERE name = 'Apple'");
```

## Delete a row

```js
import { deleteFrom } from "jsquel";

deleteFrom("DELETE FROM products WHERE id = 103");
```

## Full example

```js
import {
  createTable,
  insertInto,
  selectFrom,
  updateTable,
  deleteFrom
} from "jsquel";

createTable("CREATE TABLE users (id int, name txt, age int)");

insertInto("INSERT INTO users (id, name, age) VALUES (1, 'Alice', 26)");
insertInto("INSERT INTO users (id, name, age) VALUES (2, 'Bob', 31)");

const allUsers = selectFrom("SELECT * FROM users");
console.log(allUsers);

updateTable("UPDATE users SET age = 30 WHERE name = 'Alice'");

const adults = selectFrom("SELECT * FROM users WHERE age >= 30");
console.log(adults);

deleteFrom("DELETE FROM users WHERE id = 2");
```

## Notes
- jsquel uses SQL-like statements for creating, reading, updating, and deleting data.
- The database is file-based and stores data in local files.
- Use a .env file with MINI_SQL_DB_PATH to define your database storage path.

> For more details, see the [Getting Started](./) page.