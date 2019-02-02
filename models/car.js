const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    productionYear: {
        type: Number,
        required: true
    },
    mileage: {
        type: Number
    },
    color: {
        type: String
    },
    photos: {
        type: [String]
    },
    description: {
        type: String
    },
    category: {
        type: Number
    },
    priceMin: {
        type: Number
    },
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location'
    }
});

module.exports = mongoose.model('Car', carSchema);
