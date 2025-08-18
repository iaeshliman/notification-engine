/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'

// Modules
import { ConfigurationModule } from '../configuration/module'

// Logging Module
import { LoggingService } from './service'

/**
 * Module
 */

@Module({
    imports: [ConfigurationModule],
    providers: [LoggingService],
    exports: [LoggingService],
})
export class LoggingModule {}
