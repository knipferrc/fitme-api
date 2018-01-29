const getNextAppointment = (root, { trainerId }, { Appointment }) =>
  Appointment.getNextAppointment(trainerId)

module.exports = getNextAppointment
