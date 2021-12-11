const Joi = require('joi')

exports.schemaKeys = Joi.object({
  userId: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"userId" is a required field'
    }),
  token: Joi.string().allow(null).allow(''),
  tokenExpiredTime: Joi.date().allow(null).allow(''),
  isTokenExpired: Joi.boolean().default(false)
}).unknown(true)
exports.updateSchemaKeys = Joi.object({
  userId: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"userId" is a required field'
    }),
  token: Joi.string().allow(null).allow(''),
  tokenExpiredTime: Joi.date().allow(null).allow(''),
  isTokenExpired: Joi.boolean().default(false),
  id: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"id" is a required field'
    })
}).unknown(true)
