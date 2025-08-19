/**
 * Dependencies
 */

// NestJS Libraries
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

// Modules
import { ConfigurationModule } from './configuration/module'
import { LoggingModule } from './logging/module'
import { HealthModule } from './health/module'

// Middleware
import { TelemetryMiddleware } from './telemetry/middleware'
import { ClsModule } from 'nestjs-cls'

/**
 * Module
 */

@Module({
    imports: [ConfigurationModule, ClsModule.forRoot({ middleware: { mount: true } }), LoggingModule, HealthModule],
})
export class RootModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TelemetryMiddleware).forRoutes('*path')
    }
}
