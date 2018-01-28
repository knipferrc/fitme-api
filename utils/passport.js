const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

const User = require('../mongooseModels/User')

module.exports = passport => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromHeader('authorization'),
        secretOrKey: process.env.JWT_SECRET
      },
      async (payload, done) => {
        try {
          const foundUser = await User.findById(payload.userId)

          if (!foundUser) {
            return done(null, false, { message: 'Could not find user!' })
          } else {
            return done(null, foundUser)
          }
        } catch (error) {
          return done(error, false)
        }
      }
    )
  )
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        const foundUser = await User.findOne({ email })

        if (!foundUser) {
          const error = new Error('User not found.')
          error.name = 'UserNotFound'
          return done(error)
        }

        const passwordsMatch = await foundUser.validPassword(password)

        if (!passwordsMatch) {
          const error = new Error('The password you entered is incorrect.')
          error.name = 'IncorrectCredentials'
          return done(error)
        }

        const accessToken = jwt.sign(
          { userId: foundUser._id },
          process.env.JWT_SECRET
        )

        const data = {
          accessToken,
          role: foundUser.role,
          email: foundUser.email,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName
        }

        return done(null, data)
      }
    )
  )

  // Probably should serialize the id
  passport.serializeUser((user, done) => {
    done(null, user.email)
  })

  passport.deserializeUser(async (email, done) => {
    const foundUser = await User.findOne({ email })

    if (foundUser) {
      done(null, foundUser)
    } else {
      const error = new Error('No user found')
      done(error)
    }
  })
}
