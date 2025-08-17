/**
 * Exception
 */

export class ValidationException extends Error {
    failures: string[]

    constructor(message: string, errors: string[]) {
        super(message)

        this.name = this.constructor.name
        this.failures = errors
    }

    toString() {
        const list = this.failures.map((failure) => `- ${failure}`).join('\n')
        return `${super.toString()}\n${list}`
    }
}
