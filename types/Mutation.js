const Mutation = `
  type Mutation {
    login(email: String!, password: String!): User
    register(email: String!, password: String!, firstName: String!, lastName: String!): User
    sendResetPasswordEmail(email: String!): Boolean
    resetPassword(password: String!, token: String!): User
    createClient(email: String!, password: String!, firstName: String!, lastName: String!, trainerId: ID!): User
    removeTrainer(userId: String!): User @isAuthenticated
    changePassword(currentPassword: String!, newPassword: String!): User @isAuthenticated
    updateTrainerProfile(firstName: String!, lastName: String!): User @isAuthenticated
  }
`

module.exports = Mutation
