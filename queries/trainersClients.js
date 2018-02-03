const trainersClients = (root, { trainerId }, { User }) =>
  User.getTrainersClients(trainerId)

module.exports = trainersClients
