const dbConnection = require('../config/dbConnection')
const db = {}

db.sequelize = dbConnection

db.user = require('./user')(dbConnection)

module.exports = db
