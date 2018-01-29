const currentUser = require('../queries/currentUser')
const trainersWorkoutCount = require('../queries/trainersWorkoutCount')
const trainersExerciseCount = require('../queries/trainersExerciseCount')

const Query = {
  currentUser,
  trainersWorkoutCount,
  trainersExerciseCount
}

module.exports = Query
