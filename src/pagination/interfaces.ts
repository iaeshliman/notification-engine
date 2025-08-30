/**
 * Dependencies
 */

import { IsOptional, IsString } from 'class-validator'

/**
 * Interafces
 */

export interface Page<T> {
    total: number
    count: number
    cursor?: Cursor
    results: T[]
    warnings?: Warning[]
}

export interface Warning {
    name: string
    message: string
    data?: unknown
}

/**
 * Classes
 */

export class Cursor {
    @IsOptional()
    @IsString()
    filter?: string

    @IsOptional()
    @IsString()
    sort?: string
}
