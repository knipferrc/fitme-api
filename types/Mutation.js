const Mutation = `
  type Mutation {
    login(email: String!, password: String!): User
    register(email: String, password: String!, firstName: String!, lastName: String!): User
    sendResetPasswordEmail(email: String!): Boolean
    resetPassword(password: String!, token: String!): String
    register(email: String!, password: String!, firstName: String!, lastName: String!): User
    createClient(email: String!, password: String!, firstName: String!, lastName: String!, whosClient: ID!): User
  }
`

module.exports = Mutation
