import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'

import usersRoute from './routes/users'
import moviesRoute from './routes/movies'
import config from './config'

// SETUP THE ENVIRONMENT
dotenv.config()
const environment = process.env.NODE_ENV || 'production'
const stage = (config as any)[environment]
console.log('env: ' + environment)
// CREATE THE APP
const app = express()

// CONNECT TO DB
const dbUrl =
  environment === 'development'
    ? 'mongodb://localhost:27017/shashety'
    : 'mongodb://mongo:27017/shashety'

mongoose.connect(
  dbUrl,
  { useNewUrlParser: true, useCreateIndex: true },
  err => {
    if (!err) return console.log('\x1b[32m' + '[app.js] connected to db!')
  }
)

// CHECK THE ENVIRONMENT
if (environment === 'development') {
  app.use(morgan('dev'))
}

// MIDDLEWARES
app.use(bodyParser.json())

// ROUTES
app.use('/api/users', usersRoute)
app.use('/api/movies', moviesRoute)
app.get('/', (req, res) => res.send('Welcome to Shashety'))
app.get('/test', (req, res) => res.send('TEST'))

// START THE APP
app.listen(stage.port, () =>
  console.log('\x1b[32m' + `[app.ts] Listening to port ${stage.port}`)
)
