const pubsub = require('../utils/pubsub')
const SubscriptionType = require('../utils/constants/SubscriptionType')
const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const removeUser = baseResolver.createResolver(
  async (root, { userId }, { User }) => {
    const user = await User.removeUser(userId)

    pubsub.publish(SubscriptionType.NEW_OR_UPDATED_TRAINER, {
      newOrUpdatedTrainer: { ...user }
    })

    return user
  }
)

module.exports = removeUser
