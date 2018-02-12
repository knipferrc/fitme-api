const bcrypt = require('bcrypt')

const UserType = require('../../utils/constants/UserType')
const { CLIENT } = UserType

const { UserExistsError } = require('../../utils/errors')

const clientMethods = UserSchema => {
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

module.exports = clientMethods
