const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  trainerId: {
    type: String
  },
  workoutDate: {
    type: String
  },
  clientName: {
    type: String
  },
  workoutScheduled: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  }
})

AppointmentSchema.methods.getNextAppointment = function(trainerId) {
  return this.model('Appointment').findOne({ createdBy: trainerId })
}

module.exports = mongoose.model('Appointment', AppointmentSchema)
