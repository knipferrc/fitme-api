const User = `
type User {
  _id: ID!
  accessToken: String!
  role: String!
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  whosClient: ID
}
`

module.exports = User
