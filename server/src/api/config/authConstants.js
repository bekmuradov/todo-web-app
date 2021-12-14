require('dotenv').config()

const JWT = {
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  EXPIRES_IN: 60 * 60 * 24 * 7,
  MAGIC_LINK_EXPIRES_IN: '24h'
}

module.exports = {
  JWT
}
