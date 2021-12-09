const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const { JWT } = require('./authConstants')
const userModel = require('../model').user
const userService = require('../services/dbService')({ model: userModel })

passport.use('client-rule',
  new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT.TOKEN_SECRET
  }, async function (payload, done) {
    userService.findOne(payload.id).then((user) => {
      if (user) {
        return done(null, { ...user.toJSON() })
      }
      return done(new Error('No User Found'), {})
    }).catch(err => done(err, false))
  })
)
