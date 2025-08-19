/**
 * Dependencies
 */

// NestJS Libraries
import { Inject, Injectable, LoggerService, Scope } from '@nestjs/common'
import { INQUIRER } from '@nestjs/core'
import type { ConfigType } from '@nestjs/config'

// External Libraries
import { addColors, createLogger, format, Logger, transports } from 'winston'
import { ClsService } from 'nestjs-cls'

// Configuration Module
import { loggingNamespace } from '../configuration/namespace/logging'

// Logging Module
import { LogColor, LogFormat, LogLevel } from './interfaces'

/**
 * Variables
 */

const LEVEL_PADDING = Object.values(LogLevel).reduce<number>((acc, level) => Math.max(acc, level.length), 0)

/**
 * Service
 */

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService implements LoggerService {
    readonly logger: Logger
    readonly context: string

    constructor(
        @Inject(loggingNamespace.KEY)
        private readonly loggingConfiguration: ConfigType<typeof loggingNamespace>,
        @Inject(INQUIRER) private readonly parent: object,
        private readonly clsService: ClsService
    ) {
        this.context = this.parent.constructor.name === this.constructor.name ? 'System' : this.parent.constructor.name
        this.logger = createLogger({
            level: this.loggingConfiguration.level,
            levels: Object.values(LogLevel).reduce<Record<string, number>>((acc, level, index) => {
                acc[level] = index
                return acc
            }, {}),
            transports: [new transports.Console()],
            format: this.getFormat(this.loggingConfiguration.format),
        })
        addColors(
            Object.entries(LogColor).reduce<Record<string, LogColor>>((acc, [key, value]) => {
                acc[key.toLowerCase()] = value
                return acc
            }, {})
        )
    }

    private getFormat(type: LogFormat) {
        const formats = []

        switch (type) {
            case LogFormat.PLAIN:
                formats.push(
                    format.printf((info) => {
                        const parts = [new Date().toISOString()]
                        parts.push(info.level.padEnd(LEVEL_PADDING))
                        parts.push(`[Context:${this.context}]`)

                        const trace = this.clsService.get('traceId')
                        if (typeof trace === 'string') parts.push(`[Trace:${trace}]`)

                        parts.push(`${info.message}`)

                        try {
                            parts.push(JSON.stringify(info.meta))
                        } catch (error) {}
                        return parts.join(' ')
                    })
                )
                formats.push(format.colorize({ all: true }))
                break
            case LogFormat.JSON:
                formats.push(
                    format.printf((info) => {
                        try {
                            const trace = this.clsService.get('traceId')

                            return JSON.stringify({
                                level: info.level,
                                context: this.context,
                                trace: typeof trace === 'string' ? trace : undefined,
                                message: info.message,
                                meta: info.meta,
                            })
                        } catch (error) {
                            return JSON.stringify({ level: info.level, context: this.context, message: info.message })
                        }
                    })
                )
                break
        }

        return format.combine(...formats)
    }

    private print(level: LogLevel, message: string, meta?: Record<string, unknown>) {
        this.logger.log(level, message, { meta })
    }

    log(message: string, meta?: Record<string, unknown>) {
        this.print(LogLevel.INFO, message, meta)
    }

    fatal(message: string, meta?: Record<string, unknown>) {
        this.print(LogLevel.FATAL, message, meta)
    }

    error(message: string, meta?: Record<string, unknown>) {
        this.print(LogLevel.ERROR, message, meta)
    }

    warn(message: string, meta?: Record<string, unknown>) {
        this.print(LogLevel.WARN, message, meta)
    }

    info(message: string, meta?: Record<string, unknown>) {
        this.print(LogLevel.INFO, message, meta)
    }

    debug(message: string, meta?: Record<string, unknown>) {
        this.print(LogLevel.DEBUG, message, meta)
    }

    trace(message: string, meta?: Record<string, unknown>) {
        this.print(LogLevel.TRACE, message, meta)
    }
}
