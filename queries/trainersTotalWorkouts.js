const trainersTotalWorkouts = (root, { trainerId }, { Workout }) =>
  Workout.getTrainersTotalWorkouts(trainerId)

module.exports = trainersTotalWorkouts
