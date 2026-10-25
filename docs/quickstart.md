# Quick start

```bash
npm install jsquel
```

```js
import { createTable, insertInto } from "jsquel";

createTable("CREATE TABLE products (id int, name txt, quantity int)");
insertInto("INSERT INTO products (id, name, quantity) VALUES (101, 'Apple', 10)");
```