const Joi = require('joi')
exports.todoListItemSchemaKeys = Joi.object({
  description: Joi.string()
    .required()
    .messages({
      'string.base': '"description" should be a type of \'text\'',
      'string.empty': '"description" cannot be an empty field',
      'any.required': '"description" is a required field'
    }),
  addedBy: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"addedBy" is a required field'
    }),
  todoListId: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"todoListId" is a required field'
    }),
  isDone: Joi.boolean()
    .messages({
      'boolean.base': 'isDone must be a boolean'
    })
}).unknown(true)

exports.updateTodoListItemSchemaKeys = Joi.object({
  id: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"id" is a required field'
    }),
  description: Joi.string()
    .messages({
      'string.base': '"description" should be a type of \'text\'',
      'string.empty': '"description" cannot be an empty field'
    }),
  addedBy: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"addedBy" is a required field'
    }),
  todoListId: Joi.number()
    .integer()
    .required()
    .messages({
      'any.required': '"todoListId" is a required field'
    }),
  isDone: Joi.boolean()
    .messages({
      'boolean.type': 'isDone must be a boolean'
    })
}).unknown(true)
