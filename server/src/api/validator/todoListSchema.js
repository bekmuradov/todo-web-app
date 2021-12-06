const Joi = require('joi')

exports.todoListSchemaKeys = Joi.object({
  title: Joi.string()
    .required()
    .messages({
      'string.base': '"title" should be a type of \'text\'',
      'string.empty': '"title" cannot be an empty field',
      'any.required': '"title" is a required field'
    }),
  addedBy: Joi.number().integer()
    .required()
    .messages({
      'number.base': '"addedBy" should be a type of \'number\'',
      'number.empty': '"addedBy" cannot be an empty field',
      'any.required': '"addedBy" is a required field'
    })
}).unknown(true)

exports.updateTodoListSchemaKeys = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'string.base': '"id" should be a type of \'string\'',
      'string.empty': '"id" cannot be an empty field',
      'any.required': '"id" is a required field'
    }),
  title: Joi.string()
    .required()
    .messages({
      'string.base': '"title" should be a type of \'text\'',
      'string.empty': '"title" cannot be an empty field',
      'any.required': '"title" is a required field'
    }),
  addedBy: Joi.string()
    .required()
    .messages({
      'string.base': '"addedBy" should be a type of \'string\'',
      'string.empty': '"addedBy" cannot be an empty field',
      'any.required': '"addedBy" is a required field'
    })
}).unknown(true)
