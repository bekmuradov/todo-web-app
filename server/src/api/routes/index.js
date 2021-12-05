const express = require('express')
const router = express.Router()

// const todoLists = require('./todoListsRoute')

router
  .use('/auth', require('./authRoute'))

// router
//   .get('/todolists', todolists.index)
//   .get('/todolists/:id', todolists.show)
//   .post('/todolists', todolists.create)

module.exports = router
