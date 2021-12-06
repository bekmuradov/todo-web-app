const buildMakeTodoList = require('./makeTodoList')
const buildPatchTodoList = require('./patchTodoList')

const { todoListSchemaKeys, updateTodoListSchemaKeys } = require('../../validator/todoListSchema')
const todoListValidator = require('../../validator/index')(todoListSchemaKeys)
const patchTodoListValidator = require('../../validator/index')(updateTodoListSchemaKeys)

const makeTodoList = buildMakeTodoList(todoListValidator)
const patchTodoList = buildPatchTodoList(patchTodoListValidator)

const services = Object.freeze({ makeTodoList, patchTodoList })

module.exports = services
module.exports = { makeTodoList, patchTodoList }
