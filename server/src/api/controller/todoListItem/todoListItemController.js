const responseMessage = require('../../utils/responseMessages')

function makeTodoListItemController ({ todoListItemService, makeTodoListItem, patchTodoListItem, todoListItemModel }) {
  const insert = async ({ data }) => {
    try {
      const todoListItem = makeTodoListItem(data)
      const NewTodoListItem = {
        description: todoListItem.getDescription(),
        added_by: todoListItem.getUserId(),
        todolist_id: todoListItem.getTodoListId(),
        is_done: todoListItem.getIsDone()
      }
      const createdTodoListItem = await todoListItemService.createOne(NewTodoListItem)
      return responseMessage.successResponse({ data: createdTodoListItem })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const insertBulk = async ({ data }) => {
    try {
      console.log('>>>>>>>>', data)
      const TodoListItemEntities = data.map((item) => {
        const newItem = makeTodoListItem(item)
        return {
          description: newItem.getDescription(),
          added_by: newItem.getUserId(),
          todolist_id: newItem.getTodoListId(),
          is_done: newItem.getIsDone()
        }
      })
      console.log('>>>>>>', TodoListItemEntities)
      const result = await todoListItemService.createMany(TodoListItemEntities)
      return responseMessage.successResponse({ data: result })
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
      if (data.addedBy !== undefined && data.todoListId) {
        query = { addedBy: data.addedBy, todolistId: data.todoListId }
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
      const deletedTodoListItem = await todoListItemService.deleteByPk(id)
      return responseMessage.successResponse({ data: deletedTodoListItem })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const updateOne = async (id, data, loggedInUser) => {
    try {
      if (!id) {
        return responseMessage.badRequest()
      }
      delete data.updatedBy
      data.updatedBy = loggedInUser.id
      const todoListItem = patchTodoListItem(data)
      const NewTodoListItem = {
        id: todoListItem.getId(),
        description: todoListItem.getDescription(),
        added_by: todoListItem.getUserId(),
        todolist_id: todoListItem.getTodoListId(),
        is_done: todoListItem.getIsDone()
      }
      const filterData = removeEmpty(NewTodoListItem)
      const query = { id: id }
      const updatedTodoListItem = await todoListItemService.updateMany(query, filterData)
      // const updatedTodoList = await todoListItemService.updateByPk(NewTodoListItem)
      return responseMessage.successResponse({ data: updatedTodoListItem })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const updateMany = async (data, loggedInUser) => {
    try {
      if (data.data) {
        delete data.data.addedBy
        delete data.data.updatedBy
        data.data.updatedBy = loggedInUser.id
        const TodoListItem = makeTodoListItem(data.data)
        const filterData = removeEmpty(TodoListItem)
        const updatedTodoListItems = await todoListItemService.updateMany(data.filter, filterData)
        return responseMessage.successResponse({ data: updatedTodoListItems })
      }
      return responseMessage.badRequest()
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const removeEmpty = (obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value === undefined) {
        delete obj[key]
      }
    })
    return obj
  }

  return Object.freeze({
    insert,
    insertBulk,
    selectAll,
    selectOne,
    deleteOne,
    updateOne,
    updateMany
  })
}

module.exports = makeTodoListItemController
