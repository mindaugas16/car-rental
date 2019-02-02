const Car = require('../../models/car');
const {transformCar} = require('./merge');

module.exports = {
    cars: async () => {
        try {
            const cars = await Car.find();
            const ObjectId = require('mongoose').Types.ObjectId;
            ObjectId.prototype.valueOf = function () {
                return this.toString();
            };
            return cars.map(car => {
                return transformCar(car);
            });
        } catch (err) {
            throw err;
        }
    },
    singleCar: async args => {
        const car = await Car.findOne({_id: args.carId});
        const ObjectId = require('mongoose').Types.ObjectId;
        ObjectId.prototype.valueOf = function () {
            return this.toString();
        };
        if (!car) {
            throw new Error('Car does not exist!');
        }
        return transformCar(car);
    },
    createCar: async args => {
        try {
            const car = new Car({
                brand: args.carInput.brand,
                model: args.carInput.model,
                productionYear: args.carInput.productionYear,
                photos: args.carInput.photos,
                description: args.carInput.description,
                mileage: args.carInput.mileage,
                color: args.carInput.color,
                category: args.carInput.category,
                priceMin: args.carInput.priceMin,
                location: args.carInput.location
            });

            const result = await car.save();

            return {...result._doc, ...result};
        } catch (err) {
            throw err;
        }
    },
    updateCar: async args => {
        const car = Car.findByIdAndUpdate({_id: args.carId}, args.carUpdate);
        if (!car) {
            throw new Error('Car does not exist!');
        }
        return car;
    },
    deleteCar: async ({carId}) => {
        const car = Car.findByIdAndRemove({_id: carId});
        if (!car) {
            throw new Error('Car does not exist!');
        }
        return car;
    }
};
