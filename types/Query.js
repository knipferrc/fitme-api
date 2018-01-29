const Query = `
  type Query {
    currentUser(accesstoken: String!): User
    trainersWorkoutCount(trainerId: ID!): Int
    trainersExerciseCount(trainerId: ID!): Int
    getNextAppointment(trainerId: ID!): Appointment
	}
`

module.exports = Query
