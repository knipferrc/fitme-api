const Query = require('./Query')
const Mutation = require('./Mutation')
const Subscription = require('./Subscription')
const Schema = require('./Schema')
const User = require('./User')
const Workout = require('./Workout')
const Exercise = require('./Exercise')

const types = [User, Exercise, Workout, Query, Mutation, Subscription, Schema]

module.exports = types
