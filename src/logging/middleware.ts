/**
 * Dependencies
 */

// NestJS Libraries
import { Injectable, NestMiddleware } from '@nestjs/common'

// External Libraries
import { NextFunction, Request, Response } from 'express'

// Logging Module
import { LoggingService } from './service'

/**
 * Middleware
 */

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
    constructor(private readonly logger: LoggingService) {}

    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now()

        res.on('close', () => {
            const responseTime = Date.now() - start

            const message = `${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`
            this.logger.info(message, {
                method: req.method,
                url: req.originalUrl,
                status: res.statusCode,
                responseTime: responseTime,
            })
        })

        return next()
    }
}
