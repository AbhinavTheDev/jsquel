# jsquel

A file-based SQL database written in JavaScript. Uses SQLite-like syntax for querying and managing data.

## Folder Structure

```plaintext
jsql/
|--- lib/
|    |--- storage.js     # Creating JSON files to store data and run read/write operations
|    |--- schema.js      # Table schema management and validation
|    |--- query.js       # Query parsing and execution
|    |--- indexing.js    # Indexing and search operations
|    |--- backup.js      # Backup and restore operations
|    |--- mutex.js       # Mutex implementation for table locks
|    |--- locks.js       # Locking and unlocking tables
|--- logger/
|    |--- logger.js      # Logging utilities
|--- test/
|    |--- test_db.js     # All test functions
|--- .env                # Environment variables (Create your own)
|--- .gitignore          # Ignored files and folders
|--- .npmrc              # NPM configuration
|--- .prettierrc         # Prettier configuration
|--- eslint.config.js    # ESLint configuration
|--- index.js            # Entry point (re-exports required functions)
|--- package.json
|--- README.md
```

## Setup

- Clone the project
- Run `npm install` inside the project
- Create a `.env` file at root
- Add `MINI_SQL_DB_PATH="./database/"` in `.env` file

## Test

- Run `node test/test_db.js` # This is the test file of all library functions

### Published on NPM

[https://www.npmjs.com/package/jsquel](https://www.npmjs.com/package/jsquel)

### GitHub Repository

[https://github.com/AbhinavTheDev/jsql](https://github.com/AbhinavTheDev/jsquel)

### Example Usage

```bash
npm i jsquel
```

```javascript
// To use import syntax, please add "type": "module" in package.json
import { createTable, insertInto } from "jsquel";

// OR, for CommonJS
// const { createTable, insertInto } = require("jsquel");

createTable("CREATE TABLE products (id int, name txt, quantity int)");
insertInto("INSERT INTO products (id, name, quantity) VALUES (101, 'Apple', 10)");
```

You can check the [test_db.js](./test/test_db.js) file for more examples.

#### Author

[AbhinavTheDev](https://github.com/AbhinavTheDev)