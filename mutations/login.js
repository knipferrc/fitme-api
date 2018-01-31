const login = async (root, { email, password }, { User }) =>
  User.login(email, password)

module.exports = login
