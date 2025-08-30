/**
 * Dependencies
 */

// External Libaries
import { plainToInstance } from 'class-transformer'
import { validateSync } from 'class-validator'

// Pagination
import { Cursor } from './interfaces'

/**
 * Variables
 */

const ALGORITHM: BufferEncoding = 'base64url'

/**
 * Functions
 */

export function unmarshalCursor(cursor: string): Cursor | null {
    try {
        const decoded = Buffer.from(cursor, ALGORITHM).toString('utf-8')
        const parsed = JSON.parse(decoded)
        const instance = plainToInstance(Cursor, parsed)
        const errors = validateSync(instance, {
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false, value: false },
        })

        if (errors.length > 0) return null
        return instance
    } catch (error) {
        return null
    }
}

export function marshalCursor(cursor: Cursor): string {
    const stringified = JSON.stringify(cursor)
    const encoded = Buffer.from(stringified, 'utf-8').toString(ALGORITHM)

    return encoded
}
