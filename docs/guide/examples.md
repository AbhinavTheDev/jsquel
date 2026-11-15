# Examples

This page demonstrates common usage patterns for `jsquel`, from basic schema creation and record insertion to indexing, concurrency control, and database snapshots.


## 1. Creating a Table

Define a table schema by specifying column names and types (`INT`, `TXT`, `BOOLEAN`):

```js
import { createTable } from "jsquel";

createTable("CREATE TABLE products (id int, name txt, quantity int, in_stock boolean)");
```

This creates:
- `products.schema.json` with the column definitions.
- `products.data.json` initialized as an empty collection `[]`.


## 2. Inserting Records

Insert rows using standard SQL `INSERT INTO` syntax:

```js
import { insertInto } from "jsquel";

insertInto(
  'INSERT INTO products (id, name, quantity, in_stock) VALUES (101, "Apple", 50, true)'
);

insertInto(
  'INSERT INTO products (id, name, quantity, in_stock) VALUES (102, "Banana", 85, true)'
);

insertInto(
  'INSERT INTO products (id, name, quantity, in_stock) VALUES (103, "Orange", 0, false)'
);
```

> **Note**: Integer columns are automatically parsed into numeric values, and quotes surrounding string literals are stripped before saving to disk.


## 3. Querying Records

Display records from a table using `select`:

```js
import { select } from "jsquel";

// Query all columns
select("SELECT * FROM products");

// Query specific columns
select("SELECT id, name FROM products");
```


## 4. Indexing for Fast Lookups

For tables containing many rows, create an index on frequently queried columns to avoid full table scans:

```js
import { createIndex, searchWithIndex } from "jsquel";

// 1. Build an index on the "name" column
createIndex("products", "name");

// 2. Perform an O(1) indexed lookup
const items = searchWithIndex("products", "name", "Banana");
console.log(items);
```

Output:

```json
[
  {
    "id": 102,
    "name": "Banana",
    "quantity": 85,
    "in_stock": true
  }
]
```


## 5. Concurrent Writes with Table Locks

In serverless handlers or asynchronous event loops, multiple operations writing to the same table simultaneously could cause race conditions. Use `performWithLock` to serialize writes safely:

```js
import { performWithLock, insertInto } from "jsquel";

async function addProductConcurrently(id, name, quantity) {
  await performWithLock("products", async () => {
    insertInto(
      `INSERT INTO products (id, name, quantity, in_stock) VALUES (${id}, "${name}", ${quantity}, true)`
    );
  });
}

// Safely execute concurrent operations
await Promise.all([
  addProductConcurrently(104, "Mango", 40),
  addProductConcurrently(105, "Pineapple", 25)
]);
```


## 6. Backing Up and Restoring the Database

Create point-in-time snapshots of all tables and schemas, or restore a prior backup:

```js
import { backupDatabase, restoreDatabase } from "jsquel";

// Create a snapshot in the ./backups directory
backupDatabase("./backups/weekly_snapshot");

// Restore from a snapshot directory
restoreDatabase("./backups/weekly_snapshot");
```


## 7. Full End-to-End Workflow

A complete script assembling schema definition, data population, indexing, and backup:

```js
import {
  createTable,
  insertInto,
  select,
  createIndex,
  searchWithIndex,
  backupDatabase
} from "jsquel";

// Step 1: Initialize schema
createTable("CREATE TABLE employees (id int, name txt, department txt, active boolean)");

// Step 2: Insert employees
insertInto('INSERT INTO employees (id, name, department, active) VALUES (1, "Sarah", "Engineering", true)');
insertInto('INSERT INTO employees (id, name, department, active) VALUES (2, "Michael", "Design", true)');
insertInto('INSERT INTO employees (id, name, department, active) VALUES (3, "Elena", "Engineering", false)');

// Step 3: Print records
select("SELECT * FROM employees");

// Step 4: Index the department column
createIndex("employees", "department");

// Step 5: Lookup via index
const engineers = searchWithIndex("employees", "department", "Engineering");
console.log("Engineers found:", engineers);

// Step 6: Create backup snapshot
backupDatabase("./backups/employees_init");
```
