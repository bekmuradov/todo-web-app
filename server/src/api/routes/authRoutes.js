const express = require('express')
const router = express.Router()
const AuthController = require('../controller/authentication/index')
const adaptRequest = require('../helpers/adaptRequest')
const sendResponse = require('../helpers/sendResponse')

router.post('/register', (req, res, next) => {
  req = adaptRequest(req)
  AuthController.register({ data: req.body }).then((result) => {
    sendResponse(res, result)
  })
})

router.post('/login', (req, res, next) => {
  req = adaptRequest(req)
  AuthController.login({ data: req.body }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

module.exports = router
