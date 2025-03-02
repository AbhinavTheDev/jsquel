/**
 * @module storage
 * @description Handles file based storage operations
 */

/*
// Removed Code as it is not required afterwards :)
// import { fileURLToPath } from "url";
*/
import fs from "fs";
import { logError, logInfo } from "../logger/logger.js";
import path from "path";
import "dotenv/config";

/* 

// Removed Code as it is not required afterwards :)

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// console.log(__filename, __dirname);

// dotenv.config({path: path.resolve(__dirname, "../.env")});
*/
export const DATABASE_PATH = process.env.MINI_SQL_DB_PATH || "./database/";

// creating the database directory or folder if it doesn't exist
if (!fs.existsSync(DATABASE_PATH)) {
    fs.mkdirSync(DATABASE_PATH, { recursive: true });
    logInfo(`Database directory created at ${DATABASE_PATH}`);
}

/**
 * Gets the file path for a table's schema or data file
 * @param {string} tableName - The name of table
 * @param {string} fileType - The type of file (schema or data)
 * @return {string} - The file path
 */
export function getTableFilePath(tableName, fileType = "data") {
    return path.join(DATABASE_PATH,`${tableName}.${fileType}.json`);
}

/**
 * Reads a JSON file and returns its content
 * @param {string} filePath - Path to JSON file
 * @return {object|null} - Parsed JSON content or null if the file doesn't exist
 */
export function readJSON(filePath){
    const parsedData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : null;
    if (!parsedData){
        logError(`File not found: ${filePath}`);
    }
    return parsedData;
}

/**
 * Writes data to a JSON file
 * @param {string} filePath - Path to JSON file
 * @param {object} data - Data to write
 */
export function writeJSON(filePath, data){
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    // TODO: Write validation for filepath and return error if not found
}