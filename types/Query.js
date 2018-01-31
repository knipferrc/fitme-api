const Query = `
  type Query {
    currentUser(accessToken: String!): User
    trainersTotalExercises(trainerId: ID!): Int
    trainersTotalWorkouts(trainerId: ID!): Int
    trainersNextAppointment(trainerId: ID!): Appointment,
    trainersTotalClients(trainerId: ID!): Int
    allTrainers: [User]
	}
`

module.exports = Query
