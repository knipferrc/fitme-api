const trainersTotalClients = (root, { trainerId }, { User }) =>
  User.getTrainersTotalClients(trainerId)

module.exports = trainersTotalClients
