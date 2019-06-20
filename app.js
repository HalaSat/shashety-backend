require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')

const environment = process.env.NODE_ENV
const stage = require('./config')[environment]

// CREATE THE APP
const app = express()

// CONNECT TO DB
mongoose.connect(
  process.env.MONGO_LOCAL_CONN,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (!err) return console.log('\x1b[32m' + '[app.js] connected to db!')
  }
)

// CHECK THE ENVIRONMENT
if (environment == 'development') {
  app.use(morgan('dev'))
}

// MIDDLEWARES
app.use(bodyParser.json())

// ROUTES
app.use('/api/users', require('./routes/users'))

// START THE APP
app.listen(stage.port, () =>
  console.log('\x1b[32m' + `[app.js] Listening to port ${stage.port}`)
)
