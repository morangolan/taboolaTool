const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
  country: String,
  brand: String,
  title: String,
  thumbnail: String
});

module.exports = mongoose.model('Content', contentSchema);
