const express = require('express')
const router = express.Router()

router
  .use('/auth', require('./authRoutes'))

router
  .use('/todolist', require('./todoListRoutes'))

router
  .use('/todolistitem', require('./todoListItemRoutes'))

module.exports = router
