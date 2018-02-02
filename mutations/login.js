const { isInstance } = require('apollo-errors')
const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const login = baseResolver.createResolver(
  async (root, { email, password }, { User }, error) => {
    return User.login(email, password)
  }
)

module.exports = login
