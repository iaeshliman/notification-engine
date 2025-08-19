/**
 * Enums
 */

export enum LogLevel {
    FATAL = 'fatal',
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    DEBUG = 'debug',
    TRACE = 'trace',
}

export enum LogColor {
    FATAL = 'red',
    ERROR = 'red',
    WARN = 'yellow',
    INFO = 'white',
    DEBUG = 'blue',
    TRACE = 'green',
}

export enum LogFormat {
    PLAIN = 'plain',
    JSON = 'json',
}
