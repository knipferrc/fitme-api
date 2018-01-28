const Query = require('./Query')
const Mutation = require('./Mutation')
const Subscription = require('./Subscription')
const Schema = require('./Schema')
const User = require('./User')

const types = [User, Query, Mutation, Subscription, Schema]

module.exports = types
