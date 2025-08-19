/**
 * Dependencies
 */

// NestJS Libraries
import { registerAs } from '@nestjs/config'

// External Libraries
import { IsBoolean, IsEnum } from 'class-validator'

// Logging Module
import { LogFormat, LogLevel } from '../../logging/interfaces'

// Configuration Module
import { loadNamespace } from '../utils'

/**
 * Interfaces
 */

export class LoggingConfiguration {
    @IsEnum(LogLevel)
    level: LogLevel

    @IsEnum(LogFormat)
    format = LogFormat.JSON

    @IsBoolean()
    colored = false
}

/**
 * Functions
 */

export const loggingNamespace = registerAs<LoggingConfiguration>('logging', () => {
    return loadNamespace({
        name: 'logging',
        file: 'logging.yaml',
        class: LoggingConfiguration,
    })
})
