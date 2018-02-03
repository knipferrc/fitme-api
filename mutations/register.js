const pubsub = require('../utils/pubsub')
const SubscriptionType = require('../utils/constants/SubscriptionType')
const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const register = baseResolver.createResolver(
  async (root, { email, password, firstName, lastName }, { User }) => {
    const user = await User.register(email, password, firstName, lastName)

    pubsub.publish(SubscriptionType.NEW_OR_UPDATED_TRAINER, {
      newOrUpdatedTrainer: { ...user }
    })

    return user
  }
)

module.exports = register
