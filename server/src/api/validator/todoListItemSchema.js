const Joi = require('joi')
exports.todoListItemSchemaKeys = Joi.object({
  description: Joi.string()
    .required()
    .messages({
      'string.base': '"description" should be a type of \'text\'',
      'string.empty': '"description" cannot be an empty field',
      'any.required': '"description" is a required field'
    }),
  addedBy: Joi.number().integer()
    .required()
    .messages({
      'number.base': '"addedBy" should be a type of \'number\'',
      'number.empty': '"addedBy" cannot be an empty field',
      'any.required': '"addedBy" is a required field'
    }),
  todoListId: Joi.number().integer()
    .required()
    .messages({
      'number.base': '"todoListId" should be a type of \'number\'',
      'number.empty': '"todoListId" cannot be an empty field',
      'any.required': '"todoListId" is a required field'
    }),
  isDone: Joi.boolean()
    .messages({
      'boolean.base': 'isDone must be a boolean'
    })
}).unknown(true)

exports.updateTodoListItemSchemaKeys = Joi.object({
  id: Joi.string()
    .required()
    .messages({
      'string.base': '"id" should be a type of \'string\'',
      'string.empty': '"id" cannot be an empty field',
      'any.required': '"id" is a required field'
    }),
  description: Joi.string()
    .messages({
      'string.base': '"description" should be a type of \'text\'',
      'string.empty': '"description" cannot be an empty field'
    }),
  addedBy: Joi.number().integer()
    .required()
    .messages({
      'number.base': '"addedBy" should be a type of \'number\'',
      'number.empty': '"addedBy" cannot be an empty field',
      'any.required': '"addedBy" is a required field'
    }),
  todoListId: Joi.number().integer()
    .required()
    .messages({
      'number.base': '"todoListId" should be a type of \'number\'',
      'number.empty': '"todoListId" cannot be an empty field',
      'any.required': '"todoListId" is a required field'
    }),
  isDone: Joi.boolean()
    .messages({
      'boolean.type': 'isDone must be a boolean'
    })
}).unknown(true)
