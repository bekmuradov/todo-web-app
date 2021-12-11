const Joi = require('joi')

exports.todoListSchemaKeys = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'string.base': '"title" should be a type of \'text\'',
      'string.empty': '"title" cannot be an empty field',
      'any.required': '"title" is a required field'
    }),
  addedBy: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"addedBy" is a required field'
    })
}).unknown(true)

exports.updateTodoListSchemaKeys = Joi.object({
  id: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"id" is a required field'
    }),
  title: Joi.string()
    .required()
    .messages({
      'string.base': '"title" should be a type of \'text\'',
      'string.empty': '"title" cannot be an empty field',
      'any.required': '"title" is a required field'
    }),
  addedBy: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"addedBy" is a required field'
    })
}).unknown(true)
