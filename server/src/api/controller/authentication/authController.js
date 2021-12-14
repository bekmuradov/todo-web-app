const responseMessage = require('../../utils/responseMessages')
const { Op } = require('sequelize')
const { generateToken } = require('../../services/authService')
const { JWT } = require('../../config/authConstants')
const dayjs = require('dayjs')

function makeAuthController ({ makeUniqueValidation, userService, makeUser, tokenService, makeToken }) {
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
      // password automatically hashes before adding to db
      // user model has a hook (check model/user.js)
      const userToReturn = await userService.createOne(NewUser)
      const userJSON = userToReturn.toJSON()
      // TODO: Implement email verification (ex. send token to email)
      return responseMessage.successResponse({ data: userJSON })
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
          return responseMessage.loginFailed({ message: 'login info incorrect or maybe you have to register' })
        }
        const isPasswordMatch = await user.isPasswordMatch(password)
        if (!isPasswordMatch) {
          return responseMessage.loginFailed({ message: 'login info incorrect' })
        }
        const userJSON = user.toJSON()
        const token = await generateToken(userJSON, JWT.TOKEN_SECRET)
        const expire = dayjs().add(JWT.EXPIRES_IN, 'second').toISOString()
        await tokenService.createOne({
          user_id: userJSON.id,
          token: token,
          token_expired_time: expire,
          created_at: dayjs()
        })
        const userToReturn = {
          ...userJSON,
          ...{ token }
        }
        return responseMessage.loginSuccess({ data: userToReturn })
      }
      return responseMessage.insufficientParameters()
    } catch (error) {
      if (error.name === 'ValidationError') {
        return responseMessage.inValidParam({ message: error.message })
      }
      return responseMessage.failureResponse()
    }
  }

  const logout = async (req) => {
    try {
      if (req.user) {
        const userTokens = await tokenService.findOne({
          token: (req.headers.authorization).replace('Bearer ', ''),
          user_id: req.user.id
        })
        const id = userTokens.id
        delete userTokens.id
        await tokenService.deleteByPk(id)
        return responseMessage.requestValidated({ message: 'Logged out Successfully' })
      }
      return responseMessage.badRequest()
    } catch (error) {
      return responseMessage.failureResponse()
    }
  }

  return Object.freeze({
    register,
    login,
    logout
  })
}

module.exports = makeAuthController
