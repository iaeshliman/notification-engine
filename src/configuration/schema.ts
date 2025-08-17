/**
 * Dependencies
 */

import Joi from 'joi'

/**
 * Variables
 */

export const schema = Joi.object({
    ENCRYPTION_KEY: Joi.string().base64().required(),
    NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
    VERSION: Joi.string().required(),
})
