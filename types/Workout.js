const Workout = `
type Workout {
  workoutName: String!
  exercises: [Exercise]
  createdBy: ID!
}
`

module.exports = Workout
