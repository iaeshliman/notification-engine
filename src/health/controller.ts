/**
 * Dependencies
 */

// NestJS Libraries
import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common'
import { HealthCheck, HealthCheckService } from '@nestjs/terminus'

// Health Module
import { ApplicationHealthIndicator } from './indicators/application'

/**
 * Controller
 */

@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly applicationHealthIndicator: ApplicationHealthIndicator
    ) {}

    @Get('liveness')
    @HealthCheck()
    liveness() {
        return this.healthCheckService.check([() => this.applicationHealthIndicator.check()])
    }

    @Get('readiness')
    @HealthCheck()
    readiness() {
        return this.healthCheckService.check([() => this.applicationHealthIndicator.check()])
    }
}
