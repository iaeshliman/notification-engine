/**
 * Dependencies
 */

// NodeJS Libraries
import { join, resolve } from 'path'
import { readFileSync } from 'fs'

// External Library
import { validateSync, ValidationError } from 'class-validator'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { parse } from 'yaml'
import cloneDeepWith from 'lodash.clonedeepwith'

// Utilities
import { decrypt, isEncryptedString } from '../utilities/cryptography'

// Configuration Module
import { CONFIG_DIRECTORY } from './constants'
import { ValidationException } from './exception'

/**
 * Variables
 */

const CONFIG_PATH = resolve(__dirname, '../../', CONFIG_DIRECTORY)

/**
 * Interfaces
 */

export interface NamespaceOptions<T> {
    name: string
    file: string
    class: ClassConstructor<T>
    transformer?: (data: any) => void
}

/**
 * Functions
 */

function flattenValidationErrors(errors: ValidationError[]): string[] {
    const messages: string[] = []
    const queue = [...errors]

    while (queue.length > 0) {
        const error = queue.shift()!
        if (error.constraints) messages.push(...Object.values(error.constraints))
        if (error.children) queue.push(...error.children)
    }

    return messages
}

function decryptConfig(config: unknown): unknown {
    return cloneDeepWith(config, (value: unknown) => {
        if (typeof value === 'string' && isEncryptedString(value)) {
            const decrypted = decrypt(value)
            if (decrypted !== null) return decrypt(value)
        }
    })
}

export function loadNamespace<T extends Object>(options: NamespaceOptions<T>): T {
    const path = join(CONFIG_PATH, options.file)
    const raw = readFileSync(path, { encoding: 'utf-8' })
    const marshalled = parse(raw)
    const decrypted = decryptConfig(marshalled)
    if (options.transformer) options.transformer(decrypted)
    const namespace = plainToInstance(options.class, decrypted)

    const errors = flattenValidationErrors(
        validateSync(namespace, {
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false, value: false },
        })
    )
    if (errors.length > 0)
        throw new ValidationException(`failed to validate configuration namespace ${options.name}`, errors)

    return namespace
}
