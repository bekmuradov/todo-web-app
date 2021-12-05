function buildMakeUser ({ userValidator }) {
  return function makeUser (data) {
    const { error } = userValidator(data)
    if (error) {
      /* eslint no-throw-literal: "off" */
      throw ({
        name: 'ValidationError',
        message: `Invalid data in User entity. ${error}`
      })
    }

    return {
      password: data.password,
      email: data.email
    }
  }
}
module.exports = buildMakeUser
