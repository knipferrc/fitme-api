const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')

const Auth = require('../models/Mongo')

module.exports = (passport, db) => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        const AuthModel = new Auth(db)
        AuthModel.setCollection('users')

        try {
          const user = await AuthModel.getById(payload.userId)

          if (!user) {
            return done(null, false)
          } else {
            done(null, user)
          }
        } catch (error) {
          done(error, false)
        }
      }
    )
  )
}
