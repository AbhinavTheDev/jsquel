# Architecture Design

`jsquel` is engineered as a lightweight, zero-dependency SQL engine that uses the local filesystem and structured JSON files for persistence. It provides familiar SQL ergonomics without the operational overhead of a standalone database server.


## File-Based Storage Layout

Instead of packing tables into a proprietary binary container, `jsquel` keeps data transparent, human-readable, and version-controllable.

All database files reside within `DATABASE_PATH` (defaults to `./database/` or configured via `MINI_SQL_DB_PATH` in `.env`).

```
database/
├── users.schema.json         # Column definitions and datatypes
├── users.data.json           # Array of JSON records
├── users.name.index.json     # Inverted index on "name" column
├── products.schema.json
└── products.data.json
```

### Table Schema (`<tableName>.schema.json`)
Stores the column definitions mapped to their uppercase datatype:
```json
{
  "id": "INT",
  "name": "TXT",
  "age": "INT",
  "student": "BOOLEAN"
}
```

### Table Data (`<tableName>.data.json`)
Records are stored sequentially as standard JSON objects:
```json
[
  { "id": 1, "name": "Alice", "age": 28, "student": true },
  { "id": 2, "name": "Bob", "age": 24, "student": false }
]
```

### Index Files (`<tableName>.<column>.index.json`)
Indexes use an inverted index data structure, mapping values to row array indices for instantaneous lookups:
```json
{
  "Alice": [0],
  "Bob": [1]
}
```


## Concurrency & Table Locks

When running in asynchronous Node.js runtimes or edge environments where multiple concurrent requests might mutate state simultaneously, race conditions can cause data overwrites.

`jsquel` incorporates a table-level Mutex locking system (`Mutex` and `performWithLock`) to serialize write operations on shared tables.

### How `performWithLock` Works

```
Request A (insert)  ───> [Acquire Lock: users] ───> [Read users.data.json] ───> [Append & Write] ───> [Release Lock]
Request B (insert)  ───> [Wait on Mutex...]   ───> [Acquire Lock: users] ───> [Read & Write]    ───> [Release Lock]
```

1. **Acquisition**: When `performWithLock("users", fn)` is called, a promise-based queue registers the operation.
2. **Execution**: The operation executes while holding exclusive access to the table.
3. **Guaranteed Release**: Lock release is anchored in a `finally` block, ensuring no lock leaks even if an error is thrown during query execution.

```js
import { performWithLock, insertInto } from "jsquel";

// Safe concurrent writes
await Promise.all([
  performWithLock("users", () => insertInto('INSERT INTO users (id, name, age) VALUES (1, "A", 20)')),
  performWithLock("users", () => insertInto('INSERT INTO users (id, name, age) VALUES (2, "B", 22)'))
]);
```


## Serverless & Edge Compatibility

`jsquel` is optimized for environments where you need an embedded database without running background daemon processes like PostgreSQL or MySQL:

- **Zero Daemons**: Runs purely in-process via Node.js standard modules (`fs`, `path`).
- **Cold-Start Instantaneous**: Sub-millisecond initialization since there is no network connection handshake or daemon socket negotiation.
- **Stateless Mounts**: Easily paired with persistent volumes (AWS EFS, GCP Filestore, Docker volumes) or local ephemeral storage for transient compute tasks.
- **Portability**: Because the database is a folder of JSON files, backups, restores, and inspection are as simple as copying a directory or committing to git.


## Backup & Disaster Recovery

Snapshots can be taken synchronously at any time without stopping the application:

```js
import { backupDatabase, restoreDatabase } from "jsquel";

// Create snapshot
backupDatabase("./backups/snapshot-01");

// Restore if needed
restoreDatabase("./backups/snapshot-01");
```
