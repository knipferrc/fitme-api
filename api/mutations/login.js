const login = async (root, { email, password }, { Auth }) =>
  Auth.login(email, password)

module.exports = login
