const getTrainersExerciseCount = (root, { trainerId }, { Exercise }) =>
  Exercise.getTrainersExerciseCount(trainerId)

module.exports = getTrainersExerciseCount
