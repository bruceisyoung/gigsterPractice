let mongoose = require('mongoose');
let User = require('./userdb');

let ExpenseSchema = new mongoose.Schema({
  datetime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('expenses', ExpenseSchema); 