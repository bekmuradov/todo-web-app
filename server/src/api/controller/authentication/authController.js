const responseMessage = require('../../utils/responseMessages')

function makeAuthController ({ makeUniqueValidation, userService, makeUser }) {
  const register = async ({ data }) => {
    try {
      const user = makeUser(data)
      const isUserUnique = await makeUniqueValidation.isUserUnique(user)
      if (!isUserUnique) {
        return responseMessage.inValidParam({ message: 'User Registration Failed, Duplicate data found' })
      }
      const result = await userService.createOne(user)
      return responseMessage.successResponse({ data: result })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  return Object.freeze({
    register
  })
}

module.exports = makeAuthController
