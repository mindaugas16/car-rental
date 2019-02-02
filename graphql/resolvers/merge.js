const Location = require('../../models/location');
const Car = require('../../models/car');
const User = require('../../models/user');
const Invoice = require('../../models/invoice');

const location = async id => {
  try {
    const location = await Location.findById(id);
    return {
      ...location._doc,
      _id: location.id,
    };
  } catch (err) {
    throw err;
  }
};

const invoice = async id => {
  try {
    const invoice = await Invoice.findById(id);
    return {
      ...invoice._doc,
      _id: invoice.id,
    };
  } catch (err) {
    throw err;
  }
};

const car = async id => {
  try {
    const car = await Car.findById(id);
    return {
      ...car._doc,
      _id: car.id,
    };
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id
    };
  } catch (err) {
    throw err;
  }
};

const transformCar = car => {
  return {
    ...car._doc,
    location: location.bind(this, car.location)
  };
};

const transformRent = rent => {
  return {
    ...rent._doc,
    user: user.bind(this, rent.user),
    car: car.bind(this, rent.car),
    pickUpLocation: location.bind(this, rent.pickUpLocation),
    dropOffLocation: location.bind(this, rent.dropOffLocation),
    invoice: invoice.bind(this, rent.invoice)
  };
};

exports.transformCar = transformCar;
exports.transformRent = transformRent;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
