/**
 * Dependencies
 */

// External Libraries
import { Request as ExpressRequest } from 'express'

/**
 * Interfaces
 */

export interface Telemetry {
    trace: string
}

export interface Request extends ExpressRequest {
    telemetry?: Telemetry
}
