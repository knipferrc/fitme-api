const pubsub = require('../utils/pubsub')
const SubscriptionType = require('../utils/constants/SubscriptionType')
const UserType = require('../utils/constants/UserType')
const { withFilter } = require('graphql-subscriptions')

const newOrUpdatedTrainer = {
  subscribe: withFilter(
    () => pubsub.asyncIterator(SubscriptionType.NEW_OR_UPDATED_TRAINER),
    payload => payload.role === UserType.TRAINER
  )
}

module.exports = newOrUpdatedTrainer
