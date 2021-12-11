const buildMakeUserToken = require('./makeUserToken')

const tokenSchemaKeys = require('../../validator/userSchema')
const tokenValidator = require('../../validator/index')(tokenSchemaKeys)

const makeUserToken = buildMakeUserToken(tokenValidator)

const services = Object.freeze({ makeUserToken })

module.exports = services
module.exports = { makeUserToken }
