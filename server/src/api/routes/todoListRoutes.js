const express = require('express')
const router = express.Router()
const TodoListController = require('../controller/todoList/index')
const adaptRequest = require('../helpers/adaptRequest')
const sendResponse = require('../helpers/sendResponse')

router.post('/create', (req, res, next) => {
  req = adaptRequest(req)
  TodoListController.insert({ data: req.body }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.get('/list', (req, res, next) => {
  req = adaptRequest(req)
  TodoListController.selectAll({ data: req.queryParams }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.get('/:id', (req, res, next) => {
  req = adaptRequest(req)
  TodoListController.selectOne(req.pathParams.id).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

router.delete('/:id', (req, res, next) => {
  req = adaptRequest(req)
  TodoListController.deleteOne(req.pathParams.id).then((result) => {
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
  TodoListController.updateOne({ data }).then((result) => {
    sendResponse(res, result)
  })
    .catch((error) => {
      sendResponse(res, error)
    })
})

module.exports = router
