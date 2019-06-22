"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var environment = process.env.NODE_ENV || 'development';
var stage = require('./config')[environment];
// CREATE THE APP
var app = express();
// CONNECT TO DB
mongoose.connect(process.env.MONGO_LOCAL_CONN, { useNewUrlParser: true, useCreateIndex: true }, function (err) {
    if (!err)
        return console.log('\x1b[32m' + '[app.js] connected to db!');
});
// CHECK THE ENVIRONMENT
if (environment == 'development') {
    app.use(morgan('dev'));
}
// MIDDLEWARES
app.use(bodyParser.json());
// ROUTES
app.use('/api/users', require('./routes/users'));
app.use('/api/movies', require('./routes/movies'));
// START THE APP
app.listen(stage.port, function () {
    return console.log('\x1b[32m' + ("[app.js] Listening to port " + stage.port));
});
