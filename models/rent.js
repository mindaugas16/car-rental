const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car'
    },
    pickUpLocation: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    dropOffLocation: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    remarks: {
        type: String
    },
    status: {
        type: Number,
        required: true
    },
    price: {
        type: Number
    },
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }

});

module.exports = mongoose.model('Rent', rentSchema);
