const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserType = require('../utils/constants/UserType')
const { ADMIN, TRAINER, CLIENT } = UserType
const Schema = mongoose.Schema

const UserSchema = new Schema({
  accessToken: {
    type: String
  },
  role: {
    type: String,
    enum: [ADMIN, TRAINER, CLIENT],
    default: TRAINER
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  whosClient: {
    type: Schema.Types.ObjectId
  }
})

UserSchema.methods.login = async function(email, password) {
  const user = await this.model('User').findOne({ email })
  if (user) {
    const passwordsMatch = await bcrypt.compare(password, user.password)
    if (passwordsMatch) {
      const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET)
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

module.exports = mongoose.model('User', UserSchema)
