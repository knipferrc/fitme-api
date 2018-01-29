const currentUser = (root, { accesstoken }, { User }) =>
  User.getCurrentUser(accesstoken)

module.exports = currentUser
