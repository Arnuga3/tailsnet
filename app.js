const express = require('express');
const app = express();
const path = require('path');
// require('dotenv').config();
// require('./db');

// var UserEndPoint = require('./api/AuthEndPoint');
var AuthController = require('./auth/AuthController');

app.use(express.static(path.join(__dirname, '/client/build')));

app.get('/api', function (req, res) {
  res.status(200).send('API');
})

// app.use('/api/users', UserEndPoint);
app.use('/auth', AuthController);

module.exports = app;