const pubsub = require('../utils/pubsub')
const SubscriptionType = require('../utils/constants/SubscriptionType')

const register = async (
  root,
  { email, password, firstName, lastName },
  { User }
) => {
  const user = await User.register(email, password, firstName, lastName)

  pubsub.publish(SubscriptionType.NEW_OR_UPDATED_TRAINER, {
    newOrUpdatedTrainer: { ...user }
  })

  return user
}

module.exports = register
