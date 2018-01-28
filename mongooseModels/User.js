const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserType = require('../utils/constants/UserType')
const { ADMIN, TRAINER, CLIENT } = UserType

const UserSchema = new Schema({
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
  role: {
    type: String,
    enum: [ADMIN, TRAINER, CLIENT],
    default: TRAINER
  }
})

UserSchema.pre('save', async function(next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    const saltRounds = 10
    const hash = await bcrypt.hash(user.password, saltRounds)

    user.password = hash
    next()
  }
})

UserSchema.methods.validPassword = async function(password) {
  return bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)
