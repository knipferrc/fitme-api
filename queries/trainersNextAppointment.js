const getTrainersNextAppointment = (root, { trainerId }, { Appointment }) =>
  Appointment.getTrainersNextAppointment(trainerId)

module.exports = getTrainersNextAppointment
