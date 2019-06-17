const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const environment = process.env.NODE_ENV
const stage = require('./config')[environment]

const app = express()

if (environment == 'development') {
  app.use(morgan('dev'))
}

// MIDDLEWARES
app.use(bodyParser.json())

// ROUTES
app.use('/api', require('./routes/users'))

app.listen(stage.port, () => console.log(`Listening to port ${stage.port}`))
