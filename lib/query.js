/**
 * @module query
 * @description Parses and executes SQL queries
 */

import { logError, logSuccess } from "../logger/logger.js";
import { getTableFilePath, readJSON, writeJSON } from "./storage.js";

/**
 * Yeh hai Insert Query ki implementation
 * Insert a row into a table
 * @param {string} query -  SQL query to insert data
 */

export function insertInto(query) {
    const match = query.match(/INSERT INTO (\w+) \((.+)\) VALUES \((.+)\)/i);
    if(!match) {
        logError("Invalid INSERT INTO query");
        throw new Error("Invalid INSERT INTO query");
        // TODO: make it smart by checking what is missing in the query
        // TODO: make it case insensitive
    }

    const tableName= match[1];
    const columns = match[2].split(",").map((col) => col.trim());
    const values = match[3].split(",").map((val) => val.trim().replace(/'/g, "").replace(/"/g,""));
    const schema = readJSON(getTableFilePath(tableName, "schema"));
    const data = readJSON(getTableFilePath(tableName, "data"));

    if(!schema || !data) {
        logError(`Table "${tableName}" does not exist`);
        throw new Error(`Table "${tableName}" does not exist`);
    }

    const row = {};
    columns.forEach((col, index) => {
        if(!schema[col]) {
            logError(`Column "${col}" does not exist in table "${tableName}"`);
            throw new Error(`Column "${col}" does not exist in table "${tableName}"`);
        }
        row[col] = schema[col] === "INT" ? parseInt(values[index], 10) : values[index];
        // TODO: check for FLOAT and BOOLEAN's 
    });
    data.push(row);
    writeJSON(getTableFilePath(tableName, "data"), data);
    logSuccess(`Row inserted into table "${tableName}"!`);
}

/**
 * Yeh hai SELECT query ki implementation
 * Selects rows from a table based on a query
 * @param {string} query - SQL query to select data
 */
export function select(query) {
    const match = query.match(/SELECT (.+) FROM (\w+)(?:\s+WHERE\s+(.+))?/i);
    if(!match) {
        logError("Invalid SELECT query");
        throw new Error("Invalid SELECT query");
    }

    const columns = match[1].split(",").map((col) => col.trim());
    const tableName = match[2];
    const condition = match[3];


    const data = readJSON(getTableFilePath(tableName, "data"));
    if(!data) {
        logError(`Table "${tableName}" does not exist`);
        throw new Error(`Table "${tableName}" does not exist`);
    }

    // Not Working
    // const filteredData = condition ? data.filter((row) => {
    //     const conditionFunction = new Function("row", `return ${condition.replace(/(\w+)/g, "row.$1")}`);
    //     return conditionFunction(row);
    // }) : data;

    // const result = filteredData.map((row) => {
    //     if(columns[0] === "*") {
    //         return row;
    //     }
    //     const selectedRow = {};
    //     columns.forEach((col) => {
    //         selectedRow[col] = row[col];
    //     });
    //     return selectedRow;
    // });

    logSuccess(`SELECT query executed successfully`);
    console.table(result);
}