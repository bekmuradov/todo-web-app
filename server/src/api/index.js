const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('morgan')

require('dotenv').config()
require('./config/passportStrategy')

const app = express()

app.use(logger('combined'))
app.use(helmet())
const corsOptions = { origin: process.env.ALLOW_ORIGIN }
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'hello todo app'
  })
})

module.exports = app
