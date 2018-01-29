const trainersExerciseCount = (root, { trainerId }, { Exercise }) =>
  Exercise.trainersExerciseCount(trainerId)

module.exports = trainersExerciseCount
