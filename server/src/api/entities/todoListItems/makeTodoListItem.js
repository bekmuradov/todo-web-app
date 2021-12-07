const buildMakeTodoListItem = function (makeTodoListItemValidator) {
  return function makeTodoListItem ({ description, todoListId, isDone = false, addedBy } = {}) {
    const { error } = makeTodoListItemValidator({ description, todoListId, isDone, addedBy })
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in TodoListItem entity. ${error}`
      throw ValidationError
    }

    return Object.freeze({
      getDescription: () => description,
      getTodoListId: () => todoListId,
      getIsDone: () => isDone,
      getUserId: () => addedBy
    })
  }
}

module.exports = buildMakeTodoListItem
