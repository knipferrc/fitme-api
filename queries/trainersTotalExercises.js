const trainersTotalExercises = (root, { trainerId }, { Exercise }) =>
  Exercise.getTrainersTotalExercises(trainerId)

module.exports = trainersTotalExercises
