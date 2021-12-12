const buildMakeTodoListItem = function (makeTodoListItemValidator) {
  return function makeTodoListItem ({ id, description, todoListId, isDone = false, addedBy } = {}) {
    const { error } = makeTodoListItemValidator({ id, description, todoListId, isDone, addedBy })
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

module.exports = buildMakeTodoListItem
