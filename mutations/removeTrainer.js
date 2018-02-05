const pubsub = require('../utils/pubsub')
const SubscriptionType = require('../utils/constants/SubscriptionType')
const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const removeTrainer = baseResolver.createResolver(
  async (root, { userId }, { User }) => {
    const user = await User.removeUser(userId)

    pubsub.publish(SubscriptionType.TRAINER_REMOVED, {
      trainerRemoved: { ...user }
    })

    return user
  }
)

module.exports = removeTrainer
