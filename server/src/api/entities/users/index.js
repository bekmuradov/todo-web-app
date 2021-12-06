const buildMakeUser = require('./makeUser')

const userSchemaKeys = require('../../validator/userSchema')
const userValidator = require('../../validator/index')(userSchemaKeys)

const makeUser = buildMakeUser(userValidator)

const services = Object.freeze({ makeUser })

module.exports = services
module.exports = { makeUser }
