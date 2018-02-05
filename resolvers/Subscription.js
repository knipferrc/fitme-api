const newOrUpdatedTrainer = require('../subscriptions/newOrUpdatedTrainer')
const trainerRemoved = require('../subscriptions/trainerRemoved')

const Subscription = {
  newOrUpdatedTrainer,
  trainerRemoved
}

module.exports = Subscription
