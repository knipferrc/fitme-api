const User = `
type User {
  _id: ID
  accessToken: String
  role: String
  email: String
  firstName: String
  lastName: String
  trainersId: ID
}
`

module.exports = User
