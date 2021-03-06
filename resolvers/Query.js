const currentUser = require('../queries/currentUser')
const trainersTotalWorkouts = require('../queries/trainersTotalWorkouts')
const trainersTotalExercises = require('../queries/trainersTotalExercises')
const trainersNextAppointment = require('../queries/trainersNextAppointment')
const trainersTotalClients = require('../queries/trainersTotalClients')
const allTrainers = require('../queries/allTrainers')
const trainersClients = require('../queries/trainersClients')

const Query = {
  currentUser,
  trainersTotalWorkouts,
  trainersTotalExercises,
  trainersNextAppointment,
  trainersTotalClients,
  allTrainers,
  trainersClients
}

module.exports = Query
