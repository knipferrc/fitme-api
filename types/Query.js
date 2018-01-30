const Query = `
  type Query {
    currentUser(accessToken: String!): User
    trainersWorkoutCount(trainerId: ID!): Int
    trainersExerciseCount(trainerId: ID!): Int
    trainersNextAppointment(trainerId: ID!): Appointment,
    trainersClients(trainerId: ID!): [User]
	}
`

module.exports = Query
