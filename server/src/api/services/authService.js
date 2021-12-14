const jwt = require('jsonwebtoken')
const { JWT } = require('../config/authConstants')

async function generateToken (user, tokenSecret) {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, tokenSecret, { expiresIn: JWT.EXPIRES_IN })
}

module.exports = {
  generateToken
}
