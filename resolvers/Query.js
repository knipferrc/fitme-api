const currentUser = require('../queries/currentUser')
const trainersWorkoutCount = require('../queries/trainersWorkoutCount')
const trainersExerciseCount = require('../queries/trainersExerciseCount')
const getNextAppointment = require('../queries/getNextAppointment')
const getTrainersClients = require('../queries/getTrainersClients')

const Query = {
  currentUser,
  trainersWorkoutCount,
  trainersExerciseCount,
  getNextAppointment,
  getTrainersClients
}

module.exports = Query
