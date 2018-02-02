const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const resetPassword = baseResolver.createResolver(
  async (root, { password, token }, { User }) =>
    User.resetPassword(password, token)
)

module.exports = resetPassword
