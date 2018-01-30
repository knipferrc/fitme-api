const mongoose = require('mongoose')

const Schema = mongoose.Schema

const AppointmentSchema = new Schema({
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true
  },
  clientId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  clientFirstName: {
    type: String,
    required: true
  },
  clientLastName: {
    type: String,
    required: true
  },
  appointmentName: {
    type: String,
    unique: true,
    required: true
  },
  workoutDate: {
    type: Date,
    required: true
  },
  workoutName: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
})

AppointmentSchema.methods.getTrainersNextAppointment = function(trainerId) {
  return this.model('Appointment').findOne({ createdBy: trainerId })
}

AppointmentSchema.methods.getClientsNextAppointment = function(clientId) {
  return this.model('Appointment').findOne({ clientId: clientId })
}

module.exports = mongoose.model('Appointment', AppointmentSchema)
