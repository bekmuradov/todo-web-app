const jwt = require('jsonwebtoken')
const responseMessages = require('../utils/responseMessages')
const sendResponse = require('../helpers/sendResponse')
const { JWT } = require('../config/authConstants')

const authenticateJWT = (req, res, next) => {
  const { token } = req.query
  if (!token) {
    sendResponse(res, responseMessages.unAuthorizedRequest())
  }
  let decoded
  try {
    const secret = JWT.TOKEN_SECRET
    decoded = jwt.verify(token, secret)
  } catch {
    sendResponse(res, responseMessages.unAuthorizedRequest())
  }
  const { expirationDate, todoItemId } = decoded
  if (!todoItemId) {
    sendResponse(res, responseMessages.unAuthorizedRequest())
  }
  if (expirationDate < new Date()) {
    sendResponse(res, responseMessages.unAuthorizedRequest({ message: 'Token has expired' }))
  }
  next()
}
module.exports = authenticateJWT
