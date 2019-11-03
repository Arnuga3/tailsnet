const express = require('express');
const path = require('path');
require('dotenv').config();
require('./database/mongodb');

const UserEndPoint = require('./api/UserEndPoint');
const AuthController = require('./auth/AuthController');

const app = express();
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/users', UserEndPoint);
app.use('/auth', AuthController);

module.exports = app;