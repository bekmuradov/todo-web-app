const buildPatchTodoListItem = function (patchTodoListItemValidator) {
  return function makeTodoListItem ({ id, description, todoListId, isDone, addedBy } = {}) {
    const { error } = patchTodoListItemValidator({ id, description, todoListId, isDone, addedBy })
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in TodoListItem entity. ${error}`
      throw ValidationError
    }

    return Object.freeze({
      getId: () => id,
      getDescription: () => description,
      getTodoListId: () => todoListId,
      getIsDone: () => isDone,
      getUserId: () => addedBy
    })
  }
}

module.exports = buildPatchTodoListItem
