const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Movie = new Schema(
  {
    name: {
      type: String
    },
    category: {
      type: String
    },
    thumbnail: {
      type: String
    },
    movie: {
      type: String
    }
  },
  { collection: 'movies' }
);

module.exports = mongoose.model('movies', Movie);