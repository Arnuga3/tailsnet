const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  title: String,
  name: String,
  surname: String,
  dob: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');