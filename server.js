const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const passport = require('passport')

const middleware = require('./middleware')
const register = require('./routes/register')
const login = require('./routes/login')
const logout = require('./routes/logout')
const Auth = require('./models/Auth')
const schema = require('./schema')

require('dotenv').config()

const app = express()

const PORT = 5000

app.disable('x-powered-by')
app.use(middleware())
app.use('/register', register)
app.use('/login', login)
app.use('/logout', logout)

const db = mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useMongoClient: true
})

require('./utils/passport')(passport)

app.use(
  '/graphql',
  graphqlExpress(() => ({
    schema,
    context: {
      Auth: new Auth(db)
    }
  }))
)
app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: 'graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  })
)

const ws = createServer(app)

ws.listen(PORT, err => {
  if (err) throw err

  console.log(`Server is now running on http://localhost:${PORT}`)

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: () => console.log('CLIENT CONNECTED')
    },
    {
      server: ws,
      path: '/subscriptions'
    }
  )
})
