const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const MongoClient = require('mongodb').MongoClient
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const passport = require('passport')

const middleware = require('./middleware')
const register = require('./routes/register')
const login = require('./routes/login')
const Auth = require('./models/Auth')
const schema = require('./schema')

require('dotenv').config()

const app = express()

const PORT = 5000

app.disable('x-powered-by')
app.use(middleware())
app.use('/register', register)
app.use('/login', login)

app.use(
  '/graphql',
  graphqlExpress(() => ({
    schema,
    context: {
      Auth: new Auth(app.locals.db)
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

MongoClient.connect(process.env.DB_CONNECTION_STRING)
  .catch(err => console.error(err.stack))
  .then(client => {
    app.locals.db = client.db('fitme')
    require('./utils/passport')(passport, app.locals.db)
    console.log('Database connection successful.')
  })
  .then(() => {
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
  })
