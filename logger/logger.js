/**
 * @module logger
 * @description logs messages to console
 */

import pc from "picocolors";

//log levels enumeration

const LOG_LEVELS = {
    DEBUG: "[DEBUG]",
    ERROR: "[ERROR]",
    INFO: "[INFO}",
    SUCCESS: "[SUCCESS]", 
};

/**
 * Format a date object to a string
 * @param {Date} date - The date object to format
 * @returns {string} - The formatted date string
 * @example `formatDate(new Date())` returns `16-Feb-2025 04:34:33:112`
 */

function formatDate(date) {
    return Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
        hour12: false, 
    }).format(date);
}

/**
 * Logs a message to the console
 * @param {string} level - log level 
 * @param {Function} colorFn - picocolors color function
 * @param {Function} logMethod - console method (console.debug, console.warn, etc)
 * @param {string} message - message to log
 * @param  {...any[]} args - additional arguments to log
 */
export function logger(level, colorFn, logMethod, message, ...args){
    const timestamp = `[${formatDate(new Date())}]`;
    const coloredlevel = colorFn(level);
    logMethod(`${pc.dim(timestamp)} ${coloredlevel} ${message}`, ...args);
}

/**
 * Logs an error messasge to the console
 * @param {string} message - error message to log 
 * @param  {...any[]} args - additional arguments to log
 */
export function logError(message, ...args){
    logger(LOG_LEVELS.ERROR, pc.red, console.error, message, ...args);
}

/**
 * Logs a debug message to the console.
 * @param {string} message - The debug message to log.
 * @param {...any[]} args - Additional arguments to log.
 */
export function logDebug(message, ...args) {
    logger(LOG_LEVELS.DEBUG, pc.yellow, console.debug, message, ...args);
  }
  
  /**
   * Logs an info message to the console.
   * @param {string} message - The info message to log.
   * @param {...any[]} args - Additional arguments to log.
   */
  export function logInfo(message, ...args) {
    logger(LOG_LEVELS.INFO, pc.cyan, console.info, message, ...args);
  }
  
  /**
   * Logs a success message to the console.
   * @param {string} message - The success message to log.
   * @param {...any[]} args - Additional arguments to log.
   */
  export function logSuccess(message, ...args) {
    logger(LOG_LEVELS.SUCCESS, pc.green, console.log, message, ...args);
  }