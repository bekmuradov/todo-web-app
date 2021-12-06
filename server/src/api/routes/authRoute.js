const express = require('express')
const router = express.Router()
const authController = require('../controller/authentication/index')
const adaptRequest = require('../helpers/adaptRequest')
const sendResponse = require('../helpers/sendResponse')

router.post('/register', (req, res, next) => {
  req = adaptRequest(req)
  authController.register({ data: req.body }).then((result) => {
    sendResponse(res, result)
  })
})

router.post('/login', (req, res, next) => {
  req = adaptRequest(req)
  console.log('login', req.body.email)
  authController.login({ data: req.body }).then((result) => {
    sendResponse(res, result)
  })
})

module.exports = router
