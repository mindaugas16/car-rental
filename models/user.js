const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }
  ],
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  birthDate: {
    type: Date,
    required: true
  },
  driverLicenseNumber: {
    type: Number,
    required: true
  },
  role: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
