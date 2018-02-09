const express = require('express')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const mongoose = require('mongoose')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { formatError } = require('apollo-errors')
const attachDirectives = require('./utils/attachDirectives')

const Appointment = require('./models/Appointment')
const Workout = require('./models/Workout')
const Exercise = require('./models/Exercise')
const User = require('./models/User')
const middleware = require('./middleware')
const schema = require('./schema')

require('dotenv').config()

const app = express()

const PORT = 5000

mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_CONNECTION_STRING)

app.disable('x-powered-by')
app.use(middleware())

attachDirectives(schema)

app.use(
  '/graphql',
  graphqlExpress(req => ({
    schema,
    formatError,
    context: {
      User: new User(),
      Workout: new Workout(),
      Exercise: new Exercise(),
      Appointment: new Appointment(),
      accessToken: req.headers.authorization.replace('Bearer ', '')
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
