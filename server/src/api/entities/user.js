function buildMakeUser ({ userValidator }) {
  return function makeUser (data) {
    const { error } = userValidator(data)
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in User entity. ${error}`
      throw ValidationError
    }

    return {
      password: data.password,
      email: data.email
    }
  }
}
module.exports = buildMakeUser
