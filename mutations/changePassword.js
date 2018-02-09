const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const changePassword = baseResolver.createResolver(
  async (root, { currentPassword, newPassword }, { User, accessToken }) =>
    User.changePassword(accessToken, currentPassword, newPassword)
)

module.exports = changePassword
