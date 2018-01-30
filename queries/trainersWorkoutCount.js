const getTrainersWorkoutCount = (root, { trainerId }, { Workout }) =>
  Workout.getTrainersWorkoutCount(trainerId)

module.exports = getTrainersWorkoutCount
