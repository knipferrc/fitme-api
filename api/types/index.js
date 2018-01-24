const Query = require('./Query')
const Mutation = require('./Mutation')
const Subscription = require('./Subscription')
const Schema = require('./Schema')
const User = require('./User')
const UserTokenWithRole = require('./UserTokenWithRole')

const types = [User, UserTokenWithRole, Query, Mutation, Subscription, Schema]

module.exports = types
