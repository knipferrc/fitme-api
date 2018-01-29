const currentUser = require('../queries/currentUser')
const trainersWorkoutCount = require('../queries/trainersWorkoutCount')
const trainersExerciseCount = require('../queries/trainersExerciseCount')
const getNextAppointment = require('../queries/getNextAppointment')

const Query = {
  currentUser,
  trainersWorkoutCount,
  trainersExerciseCount,
  getNextAppointment
}

module.exports = Query
