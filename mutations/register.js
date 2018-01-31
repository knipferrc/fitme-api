const register = async (
  root,
  { email, password, firstName, lastName },
  { User }
) => User.register(email, password, firstName, lastName)

module.exports = register
