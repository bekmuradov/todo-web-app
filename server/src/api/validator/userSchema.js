const Joi = require('joi')

const userSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .required()
    .messages({
      'string.min': 'password must be min 8 characters'
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'th', 'ac', 'edu'] } })
    .required()
    .messages({
      'string.email': 'accepted email tlds com, net, th, ac, edu'
    }),
  isVerified: Joi.boolean()
    .messages({
      'any.type': 'verified must be a boolean'
    })
})

module.exports = userSchema
