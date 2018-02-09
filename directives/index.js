const { AuthorizationError } = require('../utils/errors')
const jwt = require('jsonwebtoken')

const directiveResolvers = {
  isAuthenticated(result, source, args, context) {
    const token = context.accessToken
    if (!token) {
      throw new AuthorizationError({
        message: 'You must supply a JWT for authorization'
      })
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return result
    } catch (error) {
      throw new AuthorizationError()
    }
  }
}

module.exports = directiveResolvers
