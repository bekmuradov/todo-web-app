const todoListModel = require('../../model').todoList
const todoListItemModel = require('../../model').todoListItem
const { makeTodoList, patchTodoList } = require('../../entities/todoLists/')
const todoListService = require('../../services/dbService')({ model: todoListModel })
const makeTodoListController = require('./todoListController')
const TodoListController = makeTodoListController({
  todoListService,
  makeTodoList,
  patchTodoList,
  todoListModel,
  todoListItemModel
})
module.exports = TodoListController
