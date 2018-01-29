const trainersWorkoutCount = (root, { trainerId }, { Workout }) =>
  Workout.trainersWorkoutCount(trainerId)

module.exports = trainersWorkoutCount
