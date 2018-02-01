const login = require('../mutations/login')
const register = require('../mutations/register')
const createClient = require('../mutations/createClient')

const Mutation = {
  login,
  register,
  createClient
}

module.exports = Mutation
