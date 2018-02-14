const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const updateTrainerProfile = baseResolver.createResolver(
  async (root, { firstName, lastName }, { User, accessToken }) =>
    User.updateTrainerProfile(accessToken, firstName, lastName)
)

module.exports = updateTrainerProfile
