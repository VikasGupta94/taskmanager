const winston = require('winston');
const DailyRotateFile= require('winston-daily-rotate-file');
 const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            dirname: 'logs',
            filename: `logs-%DATE%.log`,     
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d', // Keep logs for 30days
        }),
    ]
});
module.exports=logger;