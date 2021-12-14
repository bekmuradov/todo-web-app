const responseMessage = require('../../utils/responseMessages')

function makeTodoListController ({ todoListService, makeTodoList, patchTodoList, todoListModel, todoListItemModel }) {
  const insert = async ({ data }) => {
    try {
      const todoList = makeTodoList(data)
      const NewTodoList = {
        title: todoList.getTitle(),
        added_by: todoList.getUserId()
      }
      const createdTodoList = await todoListService.createOne(NewTodoList)
      return responseMessage.successResponse({ data: createdTodoList })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const selectAll = async ({ data }) => {
    try {
      const { id } = data
      if (!id) {
        return responseMessage.inValidParam({ message: 'No user id' })
      }
      const query = { added_by: id }
      const options = {
        include: todoListItemModel
      }
      const result = await todoListService.findAllRecords(query, options)
      return responseMessage.successResponse({ data: result })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const selectOne = async (id) => {
    try {
      if (!id) {
        return responseMessage.badRequest()
      }
      // const query = { added_by: id }
      const options = {
        include: todoListItemModel
      }
      const result = await todoListService.findByPk(id, options)
      if (result) {
        return responseMessage.successResponse({ data: result })
      } else {
        return responseMessage.recordNotFound()
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const deleteOne = async (id) => {
    try {
      if (!id) {
        return responseMessage.badRequest()
      }
      let deletedTodoList
      try {
        deletedTodoList = await todoListService.deleteByPk(id)
      } catch (e) {
        return responseMessage.inValidParam({ message: e.message })
      }
      return responseMessage.successResponse({ data: deletedTodoList })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const updateOne = async ({ data }) => {
    try {
      if (!data.id) {
        return responseMessage.badRequest()
      }
      const todoList = patchTodoList(data)
      const NewTodoList = {
        id: todoList.getId(),
        title: todoList.getTitle(),
        added_by: todoList.getUserId()
      }
      const updatedTodoList = await todoListService.updateByPk(NewTodoList)
      return responseMessage.successResponse({ data: updatedTodoList })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  return Object.freeze({
    insert,
    selectAll,
    selectOne,
    deleteOne,
    updateOne
  })
}

module.exports = makeTodoListController
