/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'

// Modules
import { ConfigurationModule } from './configuration/module'
import { LoggingModule } from './logging/module'
import { HealthModule } from './health/module'

/**
 * Module
 */

@Module({
    imports: [ConfigurationModule, LoggingModule, HealthModule],
})
export class RootModule {}
