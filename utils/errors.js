const { createError } = require('apollo-errors')

module.exports = {
  UnknownError: createError('UnknownError', {
    message: 'An unknown error has occured'
  }),

  AuthorizationError: createError('AuthorizationError', {
    message: 'You are not authorized'
  }),

  InvalidCredentialsError: createError('InvalidCredentialsError', {
    message: 'Invalid credentials'
  }),

  UserNotFoundError: createError('UserNotFoundError', {
    message: 'User not found'
  }),

  UserExistsError: createError('UserExistsError', {
    message: 'User already exists'
  }),

  NoUserAssociatedWithEmailError: createError(
    'NoUserAssociatedWithEmailError',
    {
      message: 'No user is associated with this email'
    }
  ),

  PasswordResetLinkInvalidError: createError('PasswordResetLinkInvalidError', {
    message: 'Password reset link is invalid'
  }),

  PasswordResetLinkExpiredError: createError('PasswordResetLinkExpiredError', {
    message: 'Password reset link is invalid or expired'
  }),

  ChangePasswordDifferentPassError: createError('ChangePasswordError', {
    message: 'Your password must be different that your current password'
  }),

  ChangePasswordInvalidCurrentPassError: createError(
    'ChangePasswordInvalidCurrentPassError',
    {
      message: 'The current password you entered is invalid'
    }
  )
}
