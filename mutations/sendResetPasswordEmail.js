const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const sendResetPasswordEmail = baseResolver.createResolver(
  async (root, { email }, { User }) => User.sendResetPasswordEmail(email)
)

module.exports = sendResetPasswordEmail
