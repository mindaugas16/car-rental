const Location = require('../../models/location');

module.exports = {
    createLocation: async args => {
        try {
            const location = new Location({
                latitude: args.locationInput.latitude,
                longitude: args.locationInput.longitude,
                address: args.locationInput.address
            });

            const result = await location.save();

            return {...result._doc, ...result};
        } catch (err) {
            throw err;
        }
    },
    locations: async () => {
        try {
            const ObjectId = require('mongoose').Types.ObjectId;
            ObjectId.prototype.valueOf = function () {
                return this.toString();
            };
            return await Location.find();
        } catch (err) {
            throw err;
        }
    },
};
