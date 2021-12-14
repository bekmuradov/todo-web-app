const express = require('express')
const router = express.Router()
const AuthController = require('../controller/authentication/index')
const adaptRequest = require('../helpers/adaptRequest')
const sendResponse = require('../helpers/sendResponse')
const auth = require('../middlewares/isAuthenticated')

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

router.post('/logout', auth, (req, res, next) => {
  req = adaptRequest(req)
  AuthController.logout(req).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

module.exports = router
