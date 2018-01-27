const passport = require('passport')
const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

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
            return done(null, false, { message: 'Could not find user!' })
          } else {
            return done(null, user)
          }
        } catch (error) {
          return done(error, false)
        }
      }
    )
  ),
    passport.use(
      new LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        async (email, password, done) => {
          const AuthModel = new Auth(db)
          AuthModel.setCollection('users')

          const user = await AuthModel.getDocByFilter({ email })

          if (user) {
            const passwordsMatch = await bcrypt.compare(password, user.password)
            if (!passwordsMatch) {
              const error = new Error('The password you entered is incorrect.')
              error.name = 'IncorrectCredentials'
              return done(error)
            }
            const accessToken = jwt.sign(
              { userId: user.id },
              process.env.JWT_SECRET
            )
            const data = {
              accessToken,
              role: user.role,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName
            }
            return done(null, data)
          } else {
            const error = new Error('User not found.')
            error.name = 'UserNotFound'
            return done(error)
          }
        }
      )
    )
}
