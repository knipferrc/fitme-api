const currentUser = (root, { accesstoken }, { Auth }) =>
  Auth.getCurrentUser(accesstoken)

module.exports = currentUser
