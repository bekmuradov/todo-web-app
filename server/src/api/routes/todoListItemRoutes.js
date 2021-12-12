const express = require('express')
const router = express.Router()
const TodoListItemController = require('../controller/todoListItem/index')
const adaptRequest = require('../helpers/adaptRequest')
const sendResponse = require('../helpers/sendResponse')

router.post('/create', (req, res, next) => {
  req = adaptRequest(req)
  TodoListItemController.insert({ data: req.body }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.post('/create-bulk', (req, res, next) => {
  req = adaptRequest(req)
  console.log('logged in user', req.user)
  TodoListItemController.insertBulk({ data: req.body.data }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.get('/list', (req, res, next) => {
  req = adaptRequest(req)
  TodoListItemController.selectAll({ data: req.body }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.get('/:id', (req, res, next) => {
  req = adaptRequest(req)
  TodoListItemController.selectOne(req.pathParams.id).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.delete('/:id', (req, res, next) => {
  req = adaptRequest(req)
  TodoListItemController.deleteOne(req.pathParams.id).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.put('/:id', (req, res, next) => {
  req = adaptRequest(req)
  const data = {
    id: req.pathParams.id,
    ...req.body
  }
  TodoListItemController.updateOne({ data }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

module.exports = router
