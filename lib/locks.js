// locks are used for preventing from race conditions like concurrent operations work efficiently and 
// No Deadlock like situations occur anyhow.
// Read it : https://docs.oracle.com/cd/E17076_04/html/bdb-sql/lockhandling.html
// Read it : https://www.sqlite.org/lockingv3.html

/**
 * @module locks
 * @description Implements table level locking using MUTEX
 */

import { logError, logInfo } from "../logger/logger.js";
import Mutex from "./mutex.js";

const tableLocks = new Map();

/**
 * Acquires a lock for a table
 * @param {string} tableName - The name of the table to lock
 * @return {PromiseFunction} - A promise that resolves to an unlock function
 */

export async function lockTable(tableName) {
    if(!tableLocks.has(tableName)){
        tableLocks.set(tableName, new Mutex());
        logInfo(`[Lock] MUTEX created for table "${tableName}"`)
    }

    const mutex = tableLocks.get(tableName);
    const unlock = await mutex.lock();
    logInfo(`[Lock] Lock acquired for table "${tableName}"`);
    return unlock;
}

/**
 * Executes a callback function with table lock
 * @param {string} tableName - The name of the table to lock
 * @param {function} callback - The operation to execute when the table is locked
 */

export async function performWithLock(tableName, callback) {
    const unlock = await lockTable(tableName);
    try {
        logInfo(`[Lock] Performing operations on the table "${tableName}"`)
        await callback();
    } catch (error) {
        logError(`[Lock] Error during operation on table "${tableName}"`, error);
        throw error;
    } finally {
        unlock();
        logInfo(`[Lock] lock released for table "${tableName}"`)
    }
}