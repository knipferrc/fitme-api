const Mutation = `
  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!): User
    login(email: String!, password: String!): User
  }
`

module.exports = Mutation
