const login = require('../mutations/login')
const register = require('../mutations/register')
const createClient = require('../mutations/createClient')
const removeTrainer = require('../mutations/removeTrainer')

const sendResetPasswordEmail = require('../mutations/sendResetPasswordEmail')
const resetPassword = require('../mutations/resetPassword')
const changePassword = require('../mutations/changePassword')
const updateTrainerProfile = require('../mutations/updateTrainerProfile')

const Mutation = {
  login,
  register,
  sendResetPasswordEmail,
  resetPassword,
  createClient,
  removeTrainer,
  changePassword,
  updateTrainerProfile
}

module.exports = Mutation
