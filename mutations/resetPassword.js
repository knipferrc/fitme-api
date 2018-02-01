const resetPassword = async (root, { password, token }, { User }) =>
  User.resetPassword(password, token)

module.exports = resetPassword
