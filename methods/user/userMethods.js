const jwt = require('jsonwebtoken')

const userMethods = UserSchema => {
  UserSchema.methods.getCurrentUser = async function(accessToken) {
    const { userId } = await jwt.verify(accessToken, process.env.JWT_SECRET)
    return this.model('User').findById({
      _id: userId
    })
  }

  UserSchema.methods.removeUser = async function(userId) {
    const user = await this.model('User').findOne({ _id: userId })
    await this.model('User').remove({ _id: userId })

    return {
      _id: user._id,
      role: user.role,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }
  }
}

module.exports = userMethods
