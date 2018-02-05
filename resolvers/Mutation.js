const login = require('../mutations/login')
const register = require('../mutations/register')
const createClient = require('../mutations/createClient')
const removeTrainer = require('../mutations/removeTrainer')

const sendResetPasswordEmail = require('../mutations/sendResetPasswordEmail')
const resetPassword = require('../mutations/resetPassword')

const Mutation = {
  login,
  register,
  sendResetPasswordEmail,
  resetPassword,
  createClient,
  removeTrainer
}

module.exports = Mutation
