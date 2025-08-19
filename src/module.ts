/**
 * Dependencies
 */

// NestJS Libraries
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'

// External Libraries
import { ClsModule } from 'nestjs-cls'

// Modules
import { ConfigurationModule } from './configuration/module'
import { LoggingModule } from './logging/module'
import { HealthModule } from './health/module'

// Middleware
import { TelemetryMiddleware } from './telemetry/middleware'

/**
 * Module
 */

@Module({
    imports: [
        ConfigurationModule,
        ClsModule.forRoot({ middleware: { mount: true } }),
        LoggingModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigurationModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleOptions>('database')!,
        }),
        HealthModule,
    ],
})
export class RootModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TelemetryMiddleware).forRoutes('*path')
    }
}
