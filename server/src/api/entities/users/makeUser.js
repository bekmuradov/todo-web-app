function buildMakeUser (userValidator) {
  return function makeUser ({ email, password }) {
    const { error } = userValidator({ email, password })
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in User entity. ${error}`
      throw ValidationError
    }

    return Object.freeze({
      getPassword: () => password,
      getEmail: () => email
    })
  }
}
module.exports = buildMakeUser
