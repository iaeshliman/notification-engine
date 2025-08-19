/**
 * Dependencies
 */

// NestJS libraries
import { Injectable, NestMiddleware } from '@nestjs/common'

// External Libraries
import { NextFunction, Response } from 'express'
import { v4 } from 'uuid'
import { ClsService } from 'nestjs-cls'

// Telemetry Module
import { Request } from './interfaces'

/**
 * Variables
 */

const TRACEPARENT_HEADER = 'traceparent'

/**
 * Middleware
 */

@Injectable()
export class TelemetryMiddleware implements NestMiddleware {
    constructor(private readonly clsService: ClsService) {}

    use(req: Request, res: Response, next: NextFunction) {
        req.telemetry = { trace: this.getTrace(req) }

        // Add trace id to cls for use in logging
        this.clsService.set('traceId', req.telemetry.trace)

        return next()
    }

    private getTrace(req: Request): string {
        const traceparent = req.header(TRACEPARENT_HEADER)
        if (traceparent === undefined) return v4().replaceAll('-', '')

        const [version, traceId, parentId, flags] = traceparent.split('-')
        if (traceId === undefined) return v4().replaceAll('-', '')
        if (Buffer.from(traceId, 'hex').length !== 16) return v4().replaceAll('-', '')

        return traceId
    }
}
