const jwt = require('jsonwebtoken')
const responseMessages = require('../utils/responseMessages')
const sendResponse = require('../helpers/sendResponse')
const { JWT } = require('../config/authConstants')

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const secret = JWT.TOKEN_SECRET
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        sendResponse(res, responseMessages.unAuthorizedRequest())
      }
      req.user = user
      next()
    })
  } else {
    sendResponse(res, responseMessages.unAuthorizedRequest())
  }
}
module.exports = authenticateJWT
