const currentUser = require('../queries/currentUser')
const trainersWorkoutCount = require('../queries/trainersWorkoutCount')
const trainersExerciseCount = require('../queries/trainersExerciseCount')
const trainersNextAppointment = require('../queries/trainersNextAppointment')
const trainersClients = require('../queries/trainersClients')

const Query = {
  currentUser,
  trainersWorkoutCount,
  trainersExerciseCount,
  trainersNextAppointment,
  trainersClients
}

module.exports = Query
