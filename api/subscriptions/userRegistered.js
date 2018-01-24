const pubsub = require('../utils/pubsub')

const USER_REGISTERED = 'user_registered'

const userRegistered = {
  subscribe: () => pubsub.asyncIterator(USER_REGISTERED)
}

module.exports = userRegistered
