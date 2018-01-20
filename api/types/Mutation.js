const Mutation = `
  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!): String
  }
`

module.exports = Mutation
