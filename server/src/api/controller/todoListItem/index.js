const todoListItemModel = require('../../model').todoListItem
const { makeTodoListItem, patchTodoListItem } = require('../../entities/todoListItems/')
const todoListItemService = require('../../services/dbService')({ model: todoListItemModel })
const makeTodoListItemController = require('./todoListItemController')
const TodoListItemController = makeTodoListItemController({
  todoListItemService,
  makeTodoListItem,
  patchTodoListItem,
  todoListItemModel
})
module.exports = TodoListItemController
