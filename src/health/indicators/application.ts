/**
 * Dependencies
 */

import { Inject, Injectable } from '@nestjs/common'
import { HealthIndicatorResult, HealthIndicatorService } from '@nestjs/terminus'
import type { ConfigType } from '@nestjs/config'

// Configuration Module
import { applicationNamespace } from '../../configuration/namespace/application'

/**
 * Inidcator
 */

@Injectable()
export class ApplicationHealthIndicator {
    constructor(
        private readonly healthIndicatorService: HealthIndicatorService,
        @Inject(applicationNamespace.KEY)
        private readonly applicationConfiguration: ConfigType<typeof applicationNamespace>
    ) {}

    check(): HealthIndicatorResult {
        const indicator = this.healthIndicatorService.check('application')
        const configuration = this.applicationConfiguration

        return indicator.up({ ...configuration })
    }
}
