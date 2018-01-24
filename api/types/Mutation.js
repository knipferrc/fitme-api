const Mutation = `
  type Mutation {
    register(email: String!, password: String!, firstName: String!, lastName: String!): UserTokenWithRole
    login(email: String!, password: String!): UserTokenWithRole
  }
`

module.exports = Mutation
