const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

// Create collection and add schema
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;