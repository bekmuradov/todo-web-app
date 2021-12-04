require('dotenv').config()

if (process.env.NODE_ENV === 'development') {
  module.exports = {
    use_env_variable: process.env.DEV_DB_URL,
    dialect: process.env.DB_DIALECT
  }
} else if (process.env.NODE_ENV === 'production') {
  module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT
  }
} else {
  module.exports = {
    HOST: process.env.TEST_DB_HOST,
    USER: process.env.TEST_DB_USERNAME,
    PASSWORD: process.env.TEST_DB_PASSWORD,
    DB: process.env.TEST_DB_NAME,
    dialect: process.env.TEST_DB_DIALECT,
    port: process.env.TEST_DB_PORT
  }
}
