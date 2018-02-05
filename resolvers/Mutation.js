const login = require('../mutations/login')
const register = require('../mutations/register')
const createClient = require('../mutations/createClient')
const removeUser = require('../mutations/removeUser')

const sendResetPasswordEmail = require('../mutations/sendResetPasswordEmail')
const resetPassword = require('../mutations/resetPassword')

const Mutation = {
  login,
  register,
  sendResetPasswordEmail,
  resetPassword,
  createClient,
  removeUser
}

module.exports = Mutation
