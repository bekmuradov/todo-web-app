const responseMessage = require('../../utils/responseMessages')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const tokenSecret = process.env.TOKEN_SECRET

const EXPIRES_IN = 60 * 60 * 24 * 7

async function generateToken (user) {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, tokenSecret, { expiresIn: EXPIRES_IN })
}

function makeAuthController ({ makeUniqueValidation, userService, makeUser, authService }) {
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
        const result = {
          user: user.toJSON(),
          token: await generateToken(user.toJSON())
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
