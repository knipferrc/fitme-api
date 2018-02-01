const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4')
const moment = require('moment')

const UserType = require('../utils/constants/UserType')
const { ADMIN, TRAINER, CLIENT } = UserType

userMethods = UserSchema => {
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
        throw new Error('Invalid Credentials.')
      }
    } else {
      throw new Error('User not found.')
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
      throw new Error('User already exists.')
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

  UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
  }

  UserSchema.methods.sendResetPasswordEmail = async function(email) {
    const user = await this.model('User').findOne({ email })

    if (!user) {
      throw new Error('No user is associated with this email.')
    }

    const passwordResetToken = uuidv4()

    await this.model('User').update(
      { _id: user._id },
      {
        $set: {
          passwordResetToken,
          passwordResetExpiration: moment()
            .add(1, 'hour')
            .format()
        }
      }
    )

    //TODO - USE PRODUCTION URL
    const passwordResetUrl = `http://localhost:1234/resetPassword?token=${passwordResetToken}`

    // TODO - SEND EMAIL

    return true
  }

  UserSchema.methods.resetPassword = async function(password, token) {
    const user = await this.model('User').findOne({ passwordResetToken: token })

    if (!user) {
      throw new Error('Password reset link is invalid.')
    }

    const tokenIsExpired = moment().isAfter(user.passwordResetExpiration)

    if (tokenIsExpired) {
      throw new Error('Password reset link is invalid or expired.')
    }

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    const updatedUser = await this.model('User').update(
      { _id: user._id },
      {
        $set: {
          password: hash,
          passwordResetToken: null,
          passwordResetExpiration: null
        }
      }
    )

    return jwt.sign({ userId: createdUser._id }, process.env.JWT_SECRET)
  }

  UserSchema.methods.getCurrentUser = async function(accessToken) {
    const { userId } = await jwt.verify(accessToken, process.env.JWT_SECRET)
    return this.model('User').findById({
      _id: userId
    })
  }

  UserSchema.methods.getTrainersTotalClients = function(trainerId) {
    return this.model('User').find({
      whosClient: trainerId,
      role: CLIENT
    })
  }

  UserSchema.methods.getAllTrainers = function() {
    return this.model('User').find({ role: TRAINER })
  }
}

module.exports = userMethods
