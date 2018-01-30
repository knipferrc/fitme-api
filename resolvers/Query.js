const currentUser = require('../queries/currentUser')
const trainersTotalWorkouts = require('../queries/trainersTotalWorkouts')
const trainersTotalExercises = require('../queries/trainersTotalExercises')
const trainersNextAppointment = require('../queries/trainersNextAppointment')
const trainersTotalClients = require('../queries/trainersTotalClients')

const Query = {
  currentUser,
  trainersTotalWorkouts,
  trainersTotalExercises,
  trainersNextAppointment,
  trainersTotalClients
}

module.exports = Query
