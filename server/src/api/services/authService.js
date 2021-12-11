const jwt = require('jsonwebtoken')
const { JWT } = require('../config/authConstants')
const { sendMail } = require('./emailService')

async function generateToken (user, tokenSecret) {
  return jwt.sign({
    id: user.id,
    email: user.email
  }, tokenSecret, { expiresIn: JWT.EXPIRES_IN })
}

function makeAuthService ({ userService }) {
  const sendPasswordByEmail = async (user) => {
    try {
      // const msg = `Your Password for login : ${user.password}`
      // const mailObj = {
      //   subject: 'Your Password!',
      //   to: user.email,
      //   template: '/views/passwordTemplate',
      //   data: { message: msg }
      // }
      console.log('from auth service sending email', user)
      try {
        await sendMail(user.email, user.token)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return Object.freeze({
    sendPasswordByEmail
  })
}

module.exports = {
  generateToken,
  makeAuthService
}
