/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// Configuration Module
import { schema } from './schema'
import { applicationNamespace } from './namespace/application'
import { loggingNamespace } from './namespace/logging'
import { databaseNamespace } from './namespace/database'

/**
 * Module
 */

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [applicationNamespace, loggingNamespace, databaseNamespace],
            validationSchema: schema,
            ignoreEnvFile: true,
        }),
    ],
    exports: [ConfigModule],
})
export class ConfigurationModule {}
