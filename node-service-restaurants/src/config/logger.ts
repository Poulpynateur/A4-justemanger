import { createLogger, format, transports } from 'winston';

const { combine, splat, timestamp, printf } = format;

const options = {
    file: {
        level: 'debug',
        filename: './logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        prettyPrint: true,
        colorize: true,
    },
};

const myFormat = printf(({ level, message, timestamp, ...metadata }) => {
    return `${timestamp} [${level}] : ${message} `;
});

const logger = createLogger({
    level: 'debug',
    format: combine(
        // format.colorize(), // pretty console but unknow ASCII char in file
        splat(),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        myFormat
    ),
    transports: [
        new transports.Console(options.console),
        new transports.File(options.file),
    ],
    exitOnError: false
});

export default logger;