const user = module.exports = {}
const adaptRequest = require('../helpers/adaptRequest')
const sendResponse = require('../helpers/sendResponse')
const responseMessage = require('../utils/responseMessages')
const User = require('../model').user
const bcrypt = require('bcrypt')

user.register = async (req, res, next) => {
  // TODO
  // Separate logic in Controller, Use Cases, Entities
  req = adaptRequest(req)
  const email = req.body.email
  const password = req.body.password
  // validatation and hash password should be in controller
  if (!email) return responseMessage.inValidParam({ message: 'no email' })
  if (!password) return responseMessage.inValidParam({ message: 'no password' })
  const hashPassword = await bcrypt.hash(password, 8)
  const data = await User.create(email, hashPassword)
  // response message should be made after user has been added to db in makeUSerController
  const response = {
    headers: data.headers || { 'Content-Type': 'application/json' },
    statusCode: 200,
    data: {
      status: 'SUCCESS',
      message: data.message || 'Your request is successfully executed',
      data: {
        id: data.id,
        email: req.body.email
      }
    }
  }
  sendResponse(res, response)
}
