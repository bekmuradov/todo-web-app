const express = require('express')
const router = express.Router()

const user = require('./userRoute')
// const todoLists = require('./todoListsRoute')

router
  .post('/register', user.register)

// router
//   .get('/todolists', todolists.index)
//   .get('/todolists/:id', todolists.show)
//   .post('/todolists', todolists.create)

module.exports = router
