const Mutation = `
  type Mutation {
    login(email: String!, password: String!): User
    register(email: String!, password: String!, firstName: String!, lastName: String!): User
    createClient(email: String!, password: String!, firstName: String!, lastName: String!, whosClient: ID!): User
  }
`

module.exports = Mutation
