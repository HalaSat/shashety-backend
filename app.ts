import dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import usersRoute from './routes/users'
import moviesRoute from './routes/movies'

const environment = process.env.NODE_ENV || 'development'
const stage = require('./config')[environment]

// CREATE THE APP
const app = express()

// CONNECT TO DB
mongoose.connect(
  process.env.MONGO_LOCAL_CONN || 'mongodb://localhost:27017/shashety',
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
app.use('/api/users', usersRoute)
app.use('/api/movies', moviesRoute)

// START THE APP
app.listen(stage.port, () =>
  console.log('\x1b[32m' + `[app.js] Listening to port ${stage.port}`)
)
