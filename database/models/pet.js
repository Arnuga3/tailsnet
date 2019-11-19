const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  petType: String,
  petName: String,
  dob: String,
  profileImage: String
});
mongoose.model('Pet', PetSchema);

module.exports = mongoose.model('Pet');