/**
 * Dependencies
 */

// NestJS Libraries
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

// Modules
import { ConfigurationModule } from '../configuration/module'

// Logging Module
import { LoggingService } from './service'
import { AccessLogMiddleware } from './middleware'

/**
 * Module
 */

@Module({
    imports: [ConfigurationModule],
    providers: [LoggingService],
    exports: [LoggingService],
})
export class LoggingModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(AccessLogMiddleware).forRoutes('*path')
    }
}
