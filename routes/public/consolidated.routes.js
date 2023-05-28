var express = require('express');
var router = express.Router();
const Transaction = require('./../../models/transaction.model');

// ROUTE prefix: '/consolidated'
router.get('/today', async (req, res) => {
    const transactions = await Transaction.find({});
    res.json({
        balance: transactions.filter(t => t.date.getDate() === new Date().getDate())
            .map(t => t.amount)
            .reduce((acc, t) => acc + t, 0)
    });
});

module.exports = router;
