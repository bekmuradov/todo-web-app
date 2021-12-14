const express = require('express')
const router = express.Router()
const adaptRequest = require('../helpers/adaptRequest')
const sendResponse = require('../helpers/sendResponse')
const responseMessages = require('../utils/responseMessages')
const jwt = require('jsonwebtoken')
const { JWT } = require('../config/authConstants')
const TodoListItemController = require('../controller/todoListItem/index')

async function makeToken (todoItemId) {
  // expires in 24 hours
  const expirationDate = new Date()
  expirationDate.setHours(new Date().getHours() + 24)
  return jwt.sign({ todoItemId, expirationDate }, JWT.TOKEN_SECRET, { expiresIn: '24h' })
}

router.post('/generate-magic-link', async (req, res, next) => {
  req = adaptRequest(req)
  const todoItemId = req.body.todoitemId
  if (!todoItemId) {
    sendResponse(res, 'no todo item id')
  }
  const token = await makeToken(todoItemId)
  res.status(200).send(`http://localhost:8080/public/todoitem?token=${token}`)
})

router.get('/todoitem', (req, res, next) => {
  req = adaptRequest(req)
  console.log(req.queryParams)
  const { token } = req.queryParams
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
  TodoListItemController.selectOne(todoItemId).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

module.exports = router
