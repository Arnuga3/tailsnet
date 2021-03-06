const express = require('express');
const path = require('path');
const UserEndPoint = require('./api/UserEndPoint');
const PetEndPoint = require('./api/PetEndPoint');
const PostEndPoint = require('./api/PostEndPoint');
const AuthController = require('./auth/AuthController');
const fileUpload = require('express-fileupload');
const app = express();

// TODO - Find about reboot option on server fail or alternative solutions

require('dotenv').config();
require('./database/mongodb');

app.use(express.static(path.join(__dirname, '/client/build')));
app.use('/category', express.static(path.join(__dirname, 'public/icons')));
app.use('/image', express.static(path.join(__dirname, 'temp')));
app.use(fileUpload());

app.use('/api/user', UserEndPoint);
app.use('/api/pet', PetEndPoint);
app.use('/api/post', PostEndPoint);
app.use('/auth', AuthController);

// Handle the rest endpoints
app.get('*', (req, res) => {
  res.sendFile('index.html', {root: path.join(__dirname, '/client/build/')});
});

module.exports = app;