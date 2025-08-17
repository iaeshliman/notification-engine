/**
 * Dependencies
 */

// NestJS Libraries
import { registerAs } from '@nestjs/config'

// External Libraries
import { IsNumber, IsSemVer, IsString, Max, Min } from 'class-validator'

// Configuration Module
import { loadNamespace } from '../utils'

/**
 * Interfaces
 */

export class ApplicationConfiguration {
    @IsString()
    name: string

    @IsSemVer()
    version: string

    @IsString()
    environment: string

    @IsNumber()
    @Min(0)
    @Max(65535)
    port = 3000
}

/**
 * Functions
 */

export const applicationNamespace = registerAs<ApplicationConfiguration>('application', () => {
    return loadNamespace({
        name: 'application',
        file: 'application.yaml',
        class: ApplicationConfiguration,
        transformer: (data) => {
            if (typeof data !== 'object' || data === null) return
            data.version = process.env.VERSION
        },
    })
})
