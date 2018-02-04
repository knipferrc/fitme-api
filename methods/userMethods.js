const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuidv4 = require('uuid/v4')
const moment = require('moment')

const UserType = require('../utils/constants/UserType')
const { ADMIN, TRAINER, CLIENT } = UserType

const {
  InvalidCredentialsError,
  UserNotFoundError,
  UserExistsError,
  NoUserAssociatedWithEmailError,
  PasswordResetLinkInvalidError,
  PasswordResetLinkExpiredError
} = require('../utils/errors')

const userMethods = UserSchema => {
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

  UserSchema.methods.validPassword = function(password) {
    return bcrypt.compare(password, this.password)
  }

  UserSchema.methods.sendResetPasswordEmail = async function(email) {
    const user = await this.model('User').findOne({ email })

    if (!user) {
      throw new NoUserAssociatedWithEmailError()
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

    // Keep console.log() until email is configured for testing
    console.log('PASSWORD RESET URL: ', passwordResetUrl)

    // TODO - SEND EMAIL

    return true
  }

  UserSchema.methods.resetPassword = async function(password, token) {
    const user = await this.model('User').findOne({ passwordResetToken: token })

    if (!user) {
      throw new PasswordResetLinkInvalidError()
    }

    const tokenIsExpired = moment().isAfter(user.passwordResetExpiration)

    if (tokenIsExpired) {
      throw new PasswordResetLinkExpiredError()
    }

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    user.set({
      password: hash,
      passwordResetToken: null,
      passwordResetExpiration: null
    })

    const updatedUser = await user.save()

    const accessToken = jwt.sign(
      { userId: updatedUser._id },
      process.env.JWT_SECRET
    )

    return {
      accessToken,
      role: updatedUser.role,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName
    }
  }

  UserSchema.methods.getCurrentUser = async function(accessToken) {
    const { userId } = await jwt.verify(accessToken, process.env.JWT_SECRET)
    return this.model('User').findById({
      _id: userId
    })
  }

  UserSchema.methods.getTrainersTotalClients = function(trainerId) {
    return this.model('User')
      .find({ trainerId: trainerId })
      .count()
  }

  UserSchema.methods.getTrainersClients = function(trainerId) {
    return this.model('User').find({ trainerId: trainerId })
  }

  UserSchema.methods.getAllTrainers = function() {
    return this.model('User').find({ role: TRAINER })
  }

  UserSchema.methods.createClient = async function(
    email,
    password,
    firstName,
    lastName,
    trainerId
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
        role: CLIENT,
        trainerId: trainerId
      }

      const createdUser = await this.model('User').create(user)

      return {
        _id: createdUser._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    }
  }
}

module.exports = userMethods
