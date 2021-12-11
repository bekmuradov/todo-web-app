const userModel = require('../../model').user
const { makeUser } = require('../../entities/users/')
const userService = require('../../services/dbService')({ model: userModel })
const makeUniqueValidation = require('../../utils/uniqueValidation.js')(userService)

const tokenModel = require('../../model').userToken
const { makeToken } = require('../../entities/users/')
const tokenService = require('../../services/dbService')({ model: tokenModel })
const makeAuthController = require('./authController')
const AuthController = makeAuthController({ makeUniqueValidation, userService, makeUser, tokenService, makeToken })
module.exports = AuthController
