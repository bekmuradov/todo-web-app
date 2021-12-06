const responseMessage = require('../../utils/responseMessages')
const { Op } = require('sequelize')
const generateToken = require('../../services/authService')
const { JWT } = require('../../config/authConstants')

function makeAuthController ({ makeUniqueValidation, userService, makeUser, authService }) {
  const register = async ({ data }) => {
    try {
      const user = makeUser(data)
      const NewUser = {
        email: user.getEmail(),
        password: user.getPassword()
      }
      const isUserUnique = await makeUniqueValidation.isUserUnique(NewUser)
      if (!isUserUnique) {
        return responseMessage.inValidParam({ message: 'User Registration Failed, Duplicate data found' })
      }
      const result = await userService.createOne(NewUser)
      return responseMessage.successResponse({ data: result })
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const login = async ({ data }) => {
    try {
      const { email, password } = data
      if (email && password) {
        const query = { [Op.or]: [{ email }] }
        const user = await userService.findOne(query)
        if (!user) {
          return responseMessage.loginFailed({ message: 'login info incorrect' })
        }
        const isPasswordMatch = await user.isPasswordMatch(password)
        if (!isPasswordMatch) {
          return responseMessage.loginFailed({ message: 'login info incorrect' })
        }
        const userJSON = user.toJSON()
        const token = await generateToken(userJSON, JWT.TOKEN_SECRET)
        const result = {
          user: userJSON,
          token: token
        }
        return responseMessage.loginSuccess({ data: result })
      }
      return responseMessage.insufficientParameters()
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  return Object.freeze({
    register,
    login
  })
}

module.exports = makeAuthController
