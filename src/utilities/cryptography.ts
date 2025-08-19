/**
 * Dependencies
 */

// NodeJS Libraries
import { createDecipheriv } from 'crypto'

/**
 * Variables
 */

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!
const ALGORITHM = 'aes-256-cbc'
const ENCODING: BufferEncoding = 'base64'

/**
 * Functions
 */

export function isEncryptedString(value: string): boolean {
    return /^ENCRYPTED\|.+\|.+$/.test(value)
}

export function decrypt(value: string): string | null {
    const [_, iv, encrypted] = value.split('|')
    if (iv === undefined || encrypted === undefined) return null

    const decipher = createDecipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, ENCODING), Buffer.from(iv, ENCODING))
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, ENCODING)), decipher.final()])
    return decrypted.toString()
}
