const responseMessage = require('../../utils/responseMessages')

function makeTodoListItemController ({ todoListItemService, makeTodoListItem, patchTodoListItem, todoListItemModel }) {
  const insert = async ({ data }) => {
    try {
      const todoListItem = makeTodoListItem(data)
      const NewTodoListItem = {
        description: todoListItem.getDescription(),
        addedBy: todoListItem.getUserId(),
        todoListId: todoListItem.getTodoListId(),
        isDone: todoListItem.getIsDone()
      }
      const createdTodoList = await todoListItemService.createOne(NewTodoListItem)
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
      let query = {}
      if (data.addedBy !== undefined) {
        query = { addedBy: data.addedBy }
      }
      const result = await todoListItemService.findAllRecords(query)
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
      const result = await todoListItemService.findByPk(id)
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
      const deletedTodoList = await todoListItemService.deleteByPk(id)
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
      const todoListItem = patchTodoListItem(data)
      const NewTodoListItem = {
        id: todoListItem.getId(),
        description: todoListItem.getDescription(),
        addedBy: todoListItem.getUserId(),
        todoListId: todoListItem.getTodoListId(),
        isDone: todoListItem.getIsDone()
      }
      const updatedTodoList = await todoListItemService.updateByPk(NewTodoListItem)
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

module.exports = makeTodoListItemController
