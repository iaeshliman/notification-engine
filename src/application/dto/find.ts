/**
 * Dependencies
 */

// External Libraries
import { IsInstance, IsOptional, IsString } from 'class-validator'

// Pagination
import { Cursor } from '../../pagination/interfaces'
import { ToCursor } from '../../pagination/decorators'

/**
 * DTO
 */

export class FindApplicationDto {
    @IsOptional()
    @IsString()
    filter?: string

    @IsOptional()
    @IsString()
    sort?: string

    @ToCursor()
    @IsOptional()
    @IsInstance(Cursor)
    cursor?: Cursor
}
