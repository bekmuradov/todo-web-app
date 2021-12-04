const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

require('dotenv').config()

const app = express()
app.use(morgan('combined'))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'hello todo app'
  })
})

const api = require('./api')
app.use('/api/v1', api)

const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
})

module.exports = app
