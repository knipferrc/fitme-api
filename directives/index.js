const { AuthorizationError } = require('../utils/errors')
const jwt = require('jsonwebtoken')

const directiveResolvers = {
  isAuthenticated(result, source, args, context) {
    const token = context.headers.authorization
    if (!token) {
      throw new AuthorizationError({
        message: 'You must supply a JWT for authorization'
      })
    }
    try {
      const decoded = jwt.verify(
        token.replace('Bearer ', ''),
        process.env.JWT_SECRET
      )
      return result
    } catch (error) {
      throw new AuthorizationError()
    }
  }
}

module.exports = directiveResolvers
