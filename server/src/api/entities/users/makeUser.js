function buildMakeUser (userValidator) {
  return function makeUser ({ email, password, isVerified = false }) {
    const { error } = userValidator({ email, password, isVerified })
    if (error) {
      const ValidationError = new Error()
      ValidationError.name = 'ValidationError'
      ValidationError.message = `Invalid data in User entity. ${error}`
      throw ValidationError
    }

    return Object.freeze({
      getPassword: () => password,
      getEmail: () => email,
      getVerified: () => isVerified
    })
  }
}
module.exports = buildMakeUser
