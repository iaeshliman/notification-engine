/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'

// Modules
import { ConfigurationModule } from './configuration/module'

/**
 * Module
 */

@Module({
    imports: [ConfigurationModule],
})
export class RootModule {}
