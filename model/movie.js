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
    fileName: {
      type: String
    },
    visible: {
      type: Boolean
    },
    uploadToken: {
      type: String
    }
  },
  { collection: 'movies' }
);

module.exports = mongoose.model('movies', Movie);