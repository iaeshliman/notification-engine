/**
 * Dependencies
 */

// NestJS Libraries
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

// Configuration Module
import { schema } from './schema'
import { applicationNamespace } from './namespace/application'

/**
 * Module
 */

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [applicationNamespace],
            validationSchema: schema,
            ignoreEnvFile: true,
        }),
    ],
})
export class ConfigurationModule {}
