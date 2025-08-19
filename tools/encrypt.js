/**
 * Depenedencies
 */

// NodeJS Libraries
const { argv } = require('process')
const { createCipheriv, randomBytes } = require('crypto')

/**
 * Variables
 */

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const ALGORITHM = 'aes-256-cbc'
const ENCODING = 'base64'

/**
 * Functions
 */

function encrypt(value) {
    const iv = randomBytes(16)
    const cipher = createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, ENCODING), iv)
    const encrypted = Buffer.concat([cipher.update(value), cipher.final()])

    return `ENCRYPTED|${iv.toString(ENCODING)}|${encrypted.toString(ENCODING)}`
}

/**
 * Main
 */

function main() {
    try {
        const value = argv[2]
        const encrypted = encrypt(value)

        console.log(encrypted)
    } catch (error) {
        console.error(error)
    }
}
main()
