const todoListModel = require('../../model').todoList
const { makeTodoList, patchTodoList } = require('../../entities/todoLists/')
const todoListService = require('../../services/dbService')({ model: todoListModel })
const makeTodoListController = require('./todoListController')
const TodoListController = makeTodoListController({
  todoListService,
  makeTodoList,
  patchTodoList,
  todoListModel
})
module.exports = TodoListController
