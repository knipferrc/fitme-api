const { UnknownError } = require('../utils/errors')
const baseResolver = require('../utils/baseResolver')

const createClient = baseResolver.createResolver(
  async (root, { email, password, firstName, lastName, trainerId }, { User }) =>
    User.createClient(email, password, firstName, lastName, trainerId)
)

module.exports = createClient
