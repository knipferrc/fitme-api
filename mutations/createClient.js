const createClient = async (
  root,
  { email, password, firstName, lastName, whosClient },
  { User }
) => User.createClient(email, password, firstName, lastName, whosClient)

module.exports = createClient
