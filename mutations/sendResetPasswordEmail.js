const sendResetPasswordEmail = async (root, { email }, { User }) =>
  User.sendResetPasswordEmail(email)

module.exports = sendResetPasswordEmail
