const currentUser = (root, { accessToken }, { User }) =>
  User.getCurrentUser(accessToken)

module.exports = currentUser
