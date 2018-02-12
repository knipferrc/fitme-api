const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserType = require('../utils/constants/UserType')
const { ADMIN, TRAINER, CLIENT } = UserType

const {
  InvalidCredentialsError,
  UserNotFoundError,
  UserExistsError
} = require('../utils/errors')

const userAuthMethods = UserSchema => {
  UserSchema.methods.login = async function(email, password) {
    const user = await this.model('User').findOne({ email })
    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password)
      if (passwordsMatch) {
        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET
        )
        return {
          accessToken,
          role: user.role,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      } else {
        throw new InvalidCredentialsError()
      }
    } else {
      throw new UserNotFoundError()
    }
  }

  UserSchema.methods.register = async function(
    email,
    password,
    firstName,
    lastName
  ) {
    const duplicateUser = await this.model('User').findOne({ email })
    if (duplicateUser) {
      throw new UserExistsError()
    } else {
      const saltRounds = 10

      const hash = await bcrypt.hash(password, saltRounds)

      const user = {
        email,
        password: hash,
        firstName,
        lastName,
        role: TRAINER
      }

      const createdUser = await this.model('User').create(user)

      const accessToken = jwt.sign(
        { userId: createdUser._id },
        process.env.JWT_SECRET
      )

      return {
        accessToken,
        _id: createdUser._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    }
  }
}

module.exports = userAuthMethods
