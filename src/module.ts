/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'

// Modules
import { ConfigurationModule } from './configuration/module'
import { HealthModule } from './health/module'

/**
 * Module
 */

@Module({
    imports: [ConfigurationModule, HealthModule],
})
export class RootModule {}
