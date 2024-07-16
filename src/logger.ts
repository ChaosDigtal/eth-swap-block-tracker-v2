import * as fs from 'fs';
import * as path from 'path';

// Logger class
class Logger {
    private logFile: string;

    constructor(logFileName: string) {
        this.logFile = path.join(__dirname, logFileName);
    }

    log(message: string) {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] LOG: ${message}\n`;
        fs.appendFileSync(this.logFile, logMessage);
    }

    error(message: string) {
        const timestamp = new Date().toISOString();
        const errorMessage = `[${timestamp}] ERROR: ${message}\n`;
        fs.appendFileSync(this.logFile, errorMessage);
    }
}

// Instantiate a logger
const logger = new Logger('eth-swap.log');

// Save original console.log and console.error functions
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Override console.log
console.log = (...args: any[]) => {
    const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
    logger.log(message);
    originalConsoleLog.apply(console, args);
};

// Override console.error
console.error = (...args: any[]) => {
    const message = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' ');
    logger.error(message);
    originalConsoleError.apply(console, args);
};

// Export the logger if needed directly
export { logger };