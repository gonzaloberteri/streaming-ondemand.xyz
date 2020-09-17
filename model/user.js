const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

const Schema = mongoose.Schema;

let User = new Schema(
  {
    isEditor: {
      type: Boolean
    },
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
    expires: {
      type: Date
    }
  },
  { collection: 'users' }
).plugin(findOrCreate);

module.exports = mongoose.model('user', User);