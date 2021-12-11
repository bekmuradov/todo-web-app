const express = require('express')
const router = express.Router()
const auth = require('../middlewares/isAuthenticated')

router
  .use('/auth', require('./authRoutes'))

router
  .use('/todolist', auth, require('./todoListRoutes'))

router
  .use('/todolistitem', auth, require('./todoListItemRoutes'))

module.exports = router
