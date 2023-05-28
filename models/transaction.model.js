const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    date: {
        type: Date,
        default: new Date(),
    },
    amount: {
        type: Number,
        required: true
    }
});

transactionSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;