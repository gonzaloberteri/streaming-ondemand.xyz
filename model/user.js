const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema;

let User = new Schema(
  {
    googleId: {
      type: String
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    photo: {
      type: String
    },
  },
  { collection: 'users' }
).plugin(findOrCreate);

module.exports = mongoose.model('user', User);