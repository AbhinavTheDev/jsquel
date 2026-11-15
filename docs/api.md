# API Reference

`jsquel` exposes modular functions designed for executing SQL operations directly in JavaScript runtimes with file-based JSON persistence.

All functions are exported as ES modules directly from the package entrypoint:

```js
import {
  // Schema
  createTable,
  // Queries
  insertInto,
  select,
  // Indexing
  createIndex,
  searchWithIndex,
  // Locks & Concurrency
  performWithLock,
  lockTable,
  // Backup & Recovery
  backupDatabase,
  restoreDatabase,
  // Storage Utilities
  getTableFilePath,
  readJSON,
  writeJSON
} from "jsquel";
```


## Schema Management

### `createTable(query)`

Creates a new table schema file and initializes an empty data array for storing records.

```ts
function createTable(query: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `query` | `string` | Yes | A SQL `CREATE TABLE` query string defining the table name and column types. |

#### Supported Syntax
```sql
CREATE TABLE <tableName> (<columnName> <type>, <columnName> <type>, ...)
```

#### Column Types
- `INT` / `INTEGER`: Numeric integer values.
- `TXT` / `TEXT`: String / text values.
- `BOOLEAN`: Boolean true/false values.

#### Storage Impact
Generates two JSON files in `DATABASE_PATH`:
1. `<tableName>.schema.json`: Stores column definitions as `{ columnName: TYPE }`.
2. `<tableName>.data.json`: Initialized to `[]` (empty row collection).

#### Errors Thrown
- Throws `Error("Invalid CREATE TABLE query")` if the query does not match the SQL pattern.
- Throws `Error("Cannot create a table named 'tables'")` or `'columns'` (reserved names).
- Throws `Error("Invalid schema definition")` if column definitions lack a name or type.

#### Example
```js
import { createTable } from "jsquel";

createTable("CREATE TABLE users (id int, name txt, age int, student boolean)");
```


## Queries

### `insertInto(query)`

Inserts a new record into an existing table. Automatically validates incoming columns and casts types against the registered table schema.

```ts
function insertInto(query: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `query` | `string` | Yes | A SQL `INSERT INTO` query string containing column names and value literals. |

#### Supported Syntax
```sql
INSERT INTO <tableName> (<col1>, <col2>, ...) VALUES (<val1>, <val2>, ...)
```

#### Type Casting & Validation
- Columns declared as `INT` in the schema are converted via `parseInt(val, 10)`.
- Quotes surrounding string values (`'` or `"`) are stripped before writing.
- Validates that every inserted column exists in `<tableName>.schema.json`.

#### Errors Thrown
- Throws `Error("Invalid INSERT INTO query")` if the query pattern is malformed.
- Throws `Error('Table "<tableName>" does not exist')` if schema or data files are missing.
- Throws `Error('Column "<col>" does not exist in table "<tableName>"')` for undeclared columns.

#### Example
```js
import { insertInto } from "jsquel";

insertInto('INSERT INTO users (id, name, age, student) VALUES (1, "Alice", 28, true)');
```


### `select(query)`

Executes a `SELECT` statement across a table's stored records and displays the tabular output.

```ts
function select(query: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `query` | `string` | Yes | A SQL `SELECT` query string defining projected columns and table target. |

#### Supported Syntax
```sql
SELECT <col1>, <col2> FROM <tableName>
SELECT * FROM <tableName>
```

#### Errors Thrown
- Throws `Error("Invalid SELECT query")` if the query pattern is malformed.
- Throws `Error('Table "<tableName>" does not exist')` if the target table data file is not found.

#### Example
```js
import { select } from "jsquel";

// Select specific columns
select("SELECT id, name FROM users");

// Select all columns
select("SELECT * FROM users");
```


## Indexing & Fast Lookups

`jsquel` supports column indexing to accelerate lookups on large JSON datasets without requiring full table scans.

### `createIndex(tableName, column)`

Builds an inverted index mapping column values to row array positions and stores it as a dedicated index file.

```ts
function createIndex(tableName: string, column: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | Yes | The name of the target table. |
| `column` | `string` | Yes | The column to index. |

#### Storage Impact
Generates `<tableName>.<column>.index.json` containing an index dictionary:
```json
{
  "Alice": [0],
  "Bob": [1, 4]
}
```

#### Errors Thrown
- Throws `Error('Table "<tableName>" does not exist')` if table data file does not exist.

#### Example
```js
import { createIndex } from "jsquel";

createIndex("users", "name");
createIndex("users", "age");
```


### `searchWithIndex(tableName, column, value)`

Performs an $O(1)$ indexed lookup for records matching a specific column value.

```ts
function searchWithIndex(tableName: string, column: string, value: string | number | boolean): Array<Record<string, any>>
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | Yes | The name of the table to search. |
| `column` | `string` | Yes | The indexed column to match against. |
| `value` | `string \| number \| boolean` | Yes | The target value to search for. |

#### Return Value
- `Array<Record<string, any>>`: An array of matching row objects retrieved directly from `<tableName>.data.json`.

#### Errors Thrown
- Throws `Error('Table "<tableName>" does not exist')` if the table does not exist.
- Throws `Error('Index on column "<column>" of table "<tableName>" does not exist')` if the index has not been created.
- Throws `Error('No matching rows found for value: "<value>" in table "<tableName>"')` if the key is not in the index.

#### Example
```js
import { searchWithIndex } from "jsquel";

const matches = searchWithIndex("users", "name", "Alice");
console.log(matches);
// Output: [ { id: 1, name: "Alice", age: 28, student: true } ]
```


## Concurrency & Table Locks

To guarantee safe concurrent write operations in asynchronous and serverless environments, `jsquel` provides table-level Mutex locking to eliminate race conditions and avoid deadlocks.

### `performWithLock(tableName, callback)`

Acquires an exclusive lock on `tableName`, executes an asynchronous callback operation, and guarantees lock release in a `finally` block upon completion or failure.

```ts
function performWithLock<T>(tableName: string, callback: () => Promise<T> | T): Promise<T>
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | Yes | The target table to acquire exclusive lock for. |
| `callback` | `() => Promise<T> \| T` | Yes | Async function containing write operations. |

#### Return Value
- `Promise<T>`: Resolves with the return value of the callback after releasing the table lock.

#### Example
```js
import { performWithLock, insertInto } from "jsquel";

await performWithLock("users", async () => {
  insertInto('INSERT INTO users (id, name, age, student) VALUES (101, "Dave", 32, false)');
  insertInto('INSERT INTO users (id, name, age, student) VALUES (102, "Emma", 29, true)');
});
```


### `lockTable(tableName)`

Low-level primitive to acquire a Mutex lock on a table manually.

```ts
function lockTable(tableName: string): Promise<() => void>
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `tableName` | `string` | Yes | The name of the table to lock. |

#### Return Value
- `Promise<() => void>`: Resolves to an `unlock` release function that must be called when the critical section finishes.

#### Example
```js
import { lockTable, insertInto } from "jsquel";

const unlock = await lockTable("users");
try {
  insertInto('INSERT INTO users (id, name, age, student) VALUES (105, "Frank", 41, false)');
} finally {
  unlock();
}
```


## Backup & Recovery

`jsquel` includes built-in snapshot backup and restore capabilities to safely duplicate or restore database files across environments.

### `backupDatabase(backupPath)`

Copies all database files (schemas, data, and index files) from the active `DATABASE_PATH` to a target destination folder. Automatically creates the backup directory if it does not exist.

```ts
function backupDatabase(backupPath: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `backupPath` | `string` | Yes | Target directory path where backup files will be stored. |

#### Example
```js
import { backupDatabase } from "jsquel";

backupDatabase("./backups/2026-11-15");
```

### `restoreDatabase(backupPath)`

Restores database files from a backup directory into the active `DATABASE_PATH`, overwriting matching table files.

```ts
function restoreDatabase(backupPath: string): void
```

#### Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `backupPath` | `string` | Yes | Source directory containing backed-up JSON files. |

#### Errors Thrown
- Throws `Error("Backup directory does not exist")` if the specified backup path cannot be located.

#### Example
```js
import { restoreDatabase } from "jsquel";

restoreDatabase("./backups/2026-11-15");
```


## Storage & Low-Level Utilities

Direct access to `jsquel`'s internal storage layer for custom tooling or administrative scripts.

### `getTableFilePath(tableName, fileType)`

Generates the fully qualified filesystem path for a table's schema, data, or index file based on `DATABASE_PATH`.

```ts
function getTableFilePath(tableName: string, fileType?: string): string
```

- Default `fileType` is `"data"`.
- Returns `${DATABASE_PATH}/${tableName}.${fileType}.json`.


### `readJSON(filePath)`

Safely parses a JSON file from disk. Returns `null` and logs an error if the file does not exist.

```ts
function readJSON<T = any>(filePath: string): T | null
```


### `writeJSON(filePath, data)`

Serializes data to formatted JSON (`null, 2`) and writes it synchronously to disk.

```ts
function writeJSON(filePath: string, data: any): void
```
