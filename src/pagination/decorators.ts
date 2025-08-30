/**
 * Dependencies
 */

// External Libraries
import { Transform } from 'class-transformer'

// Pagination
import { unmarshalCursor } from './utilities'

/**
 * Decorators
 */

export function ToCursor() {
    return Transform(({ value }) => {
        const cursor = unmarshalCursor(value)
        return cursor ?? value
    })
}
