const buildPatchTodoList = function (patchTodoListValidator) {
  return function makeTodoList ({ id, title, addedBy } = {}) {
    const { error } = patchTodoListValidator({ id, title, addedBy })
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in TodoList entity. ${error}`
      throw ValidationError
    }

    return Object.freeze({
      getId: () => id,
      getTitle: () => title,
      getUserId: () => addedBy
    })
  }
}

module.exports = buildPatchTodoList
