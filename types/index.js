const Query = require('./Query')
const Mutation = require('./Mutation')
const Subscription = require('./Subscription')
const Schema = require('./Schema')
const User = require('./User')
const Workout = require('./Workout')
const Exercise = require('./Exercise')
const Appointment = require('./Appointment')
const Directive = require('./Directive')

const types = [
  User,
  Exercise,
  Workout,
  Appointment,
  Query,
  Mutation,
  Subscription,
  Directive,
  Schema
]

module.exports = types
