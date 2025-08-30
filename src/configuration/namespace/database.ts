/**
 * Dependencies
 */

// NestJS Libraries
import { registerAs } from '@nestjs/config'

// External Libraries
import { IsBoolean, IsNumber, IsOptional, IsString, IsUrl, Max, Min } from 'class-validator'

// Configuration Module
import { loadNamespace } from '../utils'

/**
 * Interfaces
 */

export class DatabaseConfiguration {
    @IsString()
    type: string

    @IsOptional()
    @IsUrl({ require_tld: false })
    host?: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(65535)
    port?: number

    @IsOptional()
    @IsString()
    username?: string

    @IsOptional()
    @IsString()
    password?: string

    @IsOptional()
    @IsString()
    database?: string

    @IsBoolean()
    autoLoadEntities = true

    @IsBoolean()
    synchronize = false
}

/**
 * Functions
 */

export const databaseNamespace = registerAs<DatabaseConfiguration>('database', () => {
    return loadNamespace({
        name: 'database',
        file: 'database.yaml',
        class: DatabaseConfiguration,
    })
})
