const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Token = new Schema(
  {
    user: {
      type: String
    },
    expires: {
      type: Date
    },
    file: {
      type: String
    },
    used: {
      type: Boolean
    }
  },
  { collection: 'tokens' }
);

module.exports = mongoose.model('token', Token);