const register = async (
  root,
  { email, password, firstName, lastName },
  { Auth }
) => Auth.register(email, password, firstName, lastName)

module.exports = register
