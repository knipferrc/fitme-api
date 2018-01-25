const Query = `
  type Query {
		currentUser(accesstoken: String!): User
	}
`

module.exports = Query
