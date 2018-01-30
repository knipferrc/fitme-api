const getTrainersClients = (root, { trainerId }, { User }) =>
  User.getTrainersClients(trainerId)

module.exports = getTrainersClients
