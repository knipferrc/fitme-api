const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const changePassword = baseResolver.createResolver(
  async (root, { password }, { User, accessToken }) =>
    User.changePassword(accessToken, password)
)

module.exports = changePassword
