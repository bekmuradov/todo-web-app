const Sequelize = require('sequelize')
const config = require('./dbConfig')

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(config.use_env_variable)
} else {
  sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    port: config.port
  })
}

module.exports = sequelize
