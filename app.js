const express = require('express');
const path = require('path');
const UserEndPoint = require('./api/UserEndPoint');
const PetsEndPoint = require('./api/PetsEndPoint');
const AuthController = require('./auth/AuthController');
const app = express();

require('dotenv').config();
require('./database/mongodb');

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/users', UserEndPoint);
app.use('/api/pets', PetsEndPoint);
app.use('/auth', AuthController);

// Handle the rest endpoints
app.get('*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '/client/build/')});
});

module.exports = app;