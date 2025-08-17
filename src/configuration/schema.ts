/**
 * Dependencies
 */

import Joi from 'joi'

/**
 * Variables
 */

export const schema = Joi.object({
    ENCRYPTION_KEY: Joi.string().base64(),
    NODE_ENV: Joi.string().valid('development', 'production'),
})
