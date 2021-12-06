const buildMakeTodoListItem = require('./makeTodoListItem')
const buildPatchTodoListItem = require('./patchTodoListItem')

const { todoListItemSchemaKeys, updateTodoListItemSchemaKeys } = require('../../validator/todoListItemSchema')
const todoListItemValidator = require('../../validator/index')(todoListItemSchemaKeys)
const patchTodoListItemValidator = require('../../validator/index')(updateTodoListItemSchemaKeys)

const makeTodoListItem = buildMakeTodoListItem(todoListItemValidator)
const patchTodoListItem = buildPatchTodoListItem(patchTodoListItemValidator)

const services = Object.freeze({ makeTodoListItem, patchTodoListItem })

module.exports = services
module.exports = { makeTodoListItem, patchTodoListItem }
