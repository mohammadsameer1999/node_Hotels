var fs = require('fs');
// const fs = require('fs');

function logToFile(message) {
    const logMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile('log.txt', logMessage, (err) => {
        if (err) {
            console.error("Failed to write to log file", err);
        }
    });
}

module.exports =  logToFile ;