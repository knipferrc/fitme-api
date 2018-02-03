const mongoose = require('mongoose')

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
  passwordResetToken: {
    type: String
  },
  passwordResetExpiration: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  trainerId: {
    type: Schema.Types.ObjectId
  }
})

require('../methods/userMethods')(UserSchema)

module.exports = mongoose.model('User', UserSchema)
