const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let User = new Schema(
  {
    text: {
      type: String
    }
  },
  { collection: 'categories' }
);

module.exports = mongoose.model('categories', User);