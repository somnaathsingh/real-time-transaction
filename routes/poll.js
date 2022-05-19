const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Transaction = require('../models/Transaction');

const Pusher = require('pusher');

const keys = require('../config/keys');

var pusher = new Pusher({
  appId: "1411430",
  key: "03d937d6cbda21480bfb",
  secret: "33ea310dbc24edbdc979",
  cluster: "ap2",
  useTLS: true
});

router.get('/', (req, res) => {
  Transaction.find().then(transaction => res.json({ success: true, transaction: transaction }));
});

router.post('/', (req, res) => {
  const newTransaction = {
    username: req.body.username,
    amount: req.body.amount,
    date: req.body.date
  };

  new Transaction(newTransaction).save().then(transaction => {
    pusher.trigger('os-poll', 'os-vote', {
      username: transaction.username,
      amount: transaction.amount,
      date: transaction.date
    });

    return res.json({ success: true, message: 'Thank you for voting' });
  });
});

module.exports = router;