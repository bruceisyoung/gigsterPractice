let mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
});

let User = mongoose.model('users', UserSchema);

module.exports = User;