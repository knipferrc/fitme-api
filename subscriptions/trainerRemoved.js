const pubsub = require('../utils/pubsub')
const SubscriptionType = require('../utils/constants/SubscriptionType')
const UserType = require('../utils/constants/UserType')
const { withFilter } = require('graphql-subscriptions')

const trainerRemoved = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(SubscriptionType.TRAINER_REMOVED),
    payload => payload.trainerRemoved.role === UserType.TRAINER
  )
}

module.exports = trainerRemoved
