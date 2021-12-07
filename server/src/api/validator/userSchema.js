const Joi = require('joi')
const pattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])'
const userSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(32)
    .regex(new RegExp(pattern))
    .messages({
      'string.min': 'password must be min 8 characters',
      'string.max': 'password must be max 32 characters',
      'string.pattern.base': 'password must contain lower case, upper case and atleast one digit'
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'th', 'ac', 'edu', 'asia'] } })
    .required()
    .messages({
      'string.email': 'accepted email tlds .com, .net, .th, .ac, .edu, .asia'
    }),
  isVerified: Joi.boolean()
    .messages({
      'boolean.base': 'verified must be a boolean'
    })
})

module.exports = userSchema
