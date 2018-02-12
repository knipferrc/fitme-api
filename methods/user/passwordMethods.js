const jwt = require('jsonwebtoken')
const uuidv4 = require('uuid/v4')
const moment = require('moment')
const bcrypt = require('bcrypt')

const {
  NoUserAssociatedWithEmailError,
  PasswordResetLinkInvalidError,
  PasswordResetLinkExpiredError,
  ChangePasswordDifferentPassError,
  ChangePasswordInvalidCurrentPassError
} = require('../../utils/errors')

const passwordMethods = UserSchema => {
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

  UserSchema.methods.changePassword = async function(
    accessToken,
    currentPassword,
    newPassword
  ) {
    const { userId } = await jwt.verify(accessToken, process.env.JWT_SECRET)

    const user = await this.model('User').findById({ _id: userId })

    const currentPasswordMatches = await bcrypt.compare(
      currentPassword,
      user.password
    )

    if (!currentPasswordMatches) {
      throw new ChangePasswordInvalidCurrentPassError()
    }

    const oldPasswordMatches = await bcrypt.compare(newPassword, user.password)

    if (oldPasswordMatches) {
      throw new ChangePasswordDifferentPassError()
    }

    const saltRounds = 10
    const hash = await bcrypt.hash(newPassword, saltRounds)

    user.set({ password: hash })

    const updatedUser = await user.save()

    const newAccessToken = jwt.sign(
      { userId: updatedUser._id },
      process.env.JWT_SECRET
    )

    return {
      accessToken: newAccessToken,
      role: updatedUser.role,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName
    }
  }
}

module.exports = passwordMethods
