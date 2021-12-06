const buildMakeTodoList = function (todoListValidator) {
  return function makeTodoList ({ title, addedBy } = {}) {
    const { error } = todoListValidator({ title, addedBy })
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in TodoList entity. ${error}`
      throw ValidationError
    }

    return Object.freeze({
      getTitle: () => title,
      getUserId: () => addedBy
    })
  }
}

module.exports = buildMakeTodoList
