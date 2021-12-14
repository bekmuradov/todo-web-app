const passport = require('passport')
const responseMessages = require('../utils/responseMessages')
const sendResponse = require('../helpers/sendResponse')
const userToken = require('../model').userToken
const tokenService = require('../services/dbService')({ model: userToken })
const jwt = require('jsonwebtoken')
const { JWT } = require('../config/authConstants')

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject('Unauthorized User')
  }
  const token = await tokenService.findOne({ token: (req.headers.authorization).replace('Bearer ', '') })
  if (!token) {
    return reject('Token not Found')
  }
  jwt.verify(token.token, JWT.TOKEN_SECRET, (err, user) => {
    if (err === 'jwt expired') {
      return reject('Token is Expired')
    } else {
      req.user = user
    }
  })
  resolve()
}

const auth = (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('client-rule', { session: false }, verifyCallback(req, resolve, reject))(
      req,
      res,
      next
    )
  })
    .then(() => next())
    .catch((error) => {
      sendResponse(res, responseMessages.unAuthorizedRequest({ message: error }))
    })
}

module.exports = auth
