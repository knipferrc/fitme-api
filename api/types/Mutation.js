const Mutation = `
  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!): String
    login(email: String!, password: String!): String
  }
`

module.exports = Mutation
