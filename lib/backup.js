/**
 * @module backup
 * @description handles databases backup and restore functionalities
 */

import fs from "fs";
import path from "path";
import { DATABASE_PATH } from "./storage.js";
import { logError, logSuccess } from "../logger/logger.js";
/**
 * Backup the entire database folder to another specified directory
 * @param {string} backupPath - the directory to save the backup
 */
export function backupDatabase(backupPath){
    if(!fs.existsSync(backupPath)){
        fs.mkdirSync(backupPath, {recursive : true});
    }

    const files = fs.readdirSync(DATABASE_PATH);

    files.forEach((file) => {
        const source = path.join(DATABASE_PATH, file);
        const destination = path.join(backupPath, file);
        fs.copyFileSync(source, destination);
    });

    logSuccess(`Database backup completed successfully! Available at: ${backupPath}`);
}

/**
 * Restore the database from a backup
 * @param {string} backupPath - the directory containing the backup files
 */

export function restoreDatabase(backupPath){
    if(!fs.existsSync(backupPath)){
        logError("Backup directory does not exist");
        throw new Error("Backup directory does not exist");
    }

    const files = fs.readdirSync(backupPath);

    files.forEach((file) => {
        const source = path.join(backupPath, file);
        const destination = path.join(DATABASE_PATH, file);
        fs.copyFileSync(source, destination);
    });

    logSuccess(`Database restored from ${backupPath} to ${DATABASE_PATH} successfully!`);
}