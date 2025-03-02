import pc from "picocolors";
import { logger } from "../logger/logger.js";
import { createTable } from "../lib/schema.js";
import { insertInto, select } from "../lib/query.js";
import { createIndex, searchWithIndex } from "../lib/indexing.js";
import { backupDatabase, restoreDatabase } from "../lib/backup.js";
import { performWithLock } from "../lib/locks.js";

function testCreateTable_v1(){
    const createTableQuery = "CREATE TABLE users (id int, name txt, age int, student boolean)";;
    try {
        createTable(createTableQuery);
        logger("[TEST]", pc.magenta, console.info, "Table creation test passed\n");
    } catch (error) {
        logger("[TEST]", pc.red, console.error, "Table creation test failed\n");
        
    }
}

function testInsertInto_v1() {
    const insertQuery_1 = 'INSERT INTO users (id, name, age, student) VALUES (1, "Alice", 23, true)';
    const insertQuery_2 = 'INSERT INTO users (id, name, age, student) VALUES (2, "bob", 22, true)';
    const insertQuery_3 = 'INSERT INTO users (id, name, age, student) VALUES (4, "olly", 28, true)';
    const insertQuery_4 = 'INSERT INTO users (id, name, age, student) VALUES (7, "jake", 23, false)';
    const insertQuery_5 = 'INSERT INTO users (id, name, age, student) VALUES (9, "know", 63, true)';
    const insertQuery_6 = 'INSERT INTO users (id, name, age, student) VALUES (11, "yoyo", 28, true)';
    try {
        insertInto(insertQuery_1);
        insertInto(insertQuery_2);
        insertInto(insertQuery_3);
        insertInto(insertQuery_4);
        insertInto(insertQuery_5);
        insertInto(insertQuery_6);
        logger("[TEST]", pc.magenta, console.info, "Insertion test passed\n");
    } catch (error) {
        logger("[TEST]", pc.red, console.error, "Insertion test failed\n");
    }
}

function testSelect_v1() {
    const selectQuery_1 = "SELECT id, name from users";
    const selectQuery_2 = "SELECT * from users";
    try {
        select(selectQuery_1);
        select(selectQuery_2);
        logger("[TEST]", pc.magenta, console.info, "Select test passed\n");
    } catch (error) {
        logger("[TEST]", pc.red, console.error, "Select test failed\n");
    }
}

function testCreateIndex_v1() {
    try {
        createIndex("users", "name");
        createIndex("users", "age");
        logger("[TEST]", pc.magenta, console.info, "Create Index test passed\n");
    } catch (error) {
        logger("[TEST]", pc.red, console.error, "Create Index test failed\n");
        throw new Error("Create Index test failed");
    }
}

function testSearchWithIndex_v1() {
    try {
        searchWithIndex("users", "name", "bob");
        searchWithIndex("users", "age", 23);
        logger("[TEST]", pc.magenta, console.info, "Search Index test passed\n");
    } catch (error) {
        logger("[TEST]", pc.red, console.error, "Search Index test failed\n");
        throw new Error("Search Index test failed");
    }
}

function testBackupDatabase_v1() {
    try {
        backupDatabase("./backup");
        logger("[TEST]", pc.magenta, console.info, "Backup test passed\n");
    } catch (error) {
        logger("[TEST]", pc.red, console.error, "Backup test failed\n");
        throw new Error("Backup test failed");
    }
}

function testRestoreDatabase_v1() {
    try {
        restoreDatabase("./backup");
        logger("[TEST]", pc.magenta, console.info, "Restore DB test passed\n");
    } catch (error) {
        logger("[TEST]", pc.red, console.error, "Restore DB test failed\n");
        throw new Error("Restore test failed");
    }
}

async function testLocks_v1() {
    try {
        const insertQueries = [
            'INSERT INTO users (id, name, age, student) VALUES (1001, "Abhi", 18, true)',
            'INSERT INTO users (id, name, age, student) VALUES (1025, "nav", 20, true)',
            'INSERT INTO users (id, name, age, student) VALUES (1036, "Mittal", 30, true)',
        ];

        const performInsert = (query, tableName) => performWithLock("users", async() => {
            logger("[TEST]", pc.magenta, console.info, `${tableName} started`);
            insertInto(query);

            await new Promise((res) => setTimeout(res, 5000));
            logger("[TEST]", pc.magenta, console.info, `${tableName} completed`);

        });

        const promises = [
            performInsert(insertQueries[0], "Task 1"),
            performInsert(insertQueries[1], "Task 2"),
        ];

        await Promise.allSettled(promises);
        logger("[TEST]", pc.magenta, console.info, `Locks Test Passed`);
    } catch (error) {
        logger("[TEST]", pc.magenta, console.error, `Locks Test failed`, error);
    }
}

export const main = () => {
    testCreateTable_v1();
    testInsertInto_v1();
    testSelect_v1();
    testCreateIndex_v1();
    testSearchWithIndex_v1();
    testBackupDatabase_v1();
    testRestoreDatabase_v1();
    testLocks_v1();
};

main();