const Appointment = `
  type Appointment {
    createdBy: ID!
    clientId: ID!
    clientFirstName: String!
    clientLastName: String!
    appointmentName: String!
    workoutDate: String!
    workoutName: String!
    startTime: String!
    endTime: String!
  }
`

module.exports = Appointment
