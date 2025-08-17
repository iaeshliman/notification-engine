/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

// Modules
import { ConfigurationModule } from '../configuration/module'

// Health Module
import { HealthController } from './controller'
import { ApplicationHealthIndicator } from './indicators/application'

/**
 * Module
 */

@Module({
    imports: [
        TerminusModule.forRoot({
            logger: false,
        }),
        ConfigurationModule,
    ],
    controllers: [HealthController],
    providers: [ApplicationHealthIndicator],
})
export class HealthModule {}
