const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    payedAt: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    rent: {
        type: Schema.Types.ObjectId,
        ref: 'Rent'
    },
    url: {
        type: String
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
