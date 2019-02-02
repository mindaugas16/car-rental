const Rent = require('../../models/rent');
const Invoice = require('../../models/invoice');
const Car = require('../../models/car');
const Location = require('../../models/location');
const {transformRent} = require('./merge');
const fs = require('fs');

module.exports = {
    createRent: async args => {
        try {
            const date = Date.now();

            const rent = new Rent({
                user: args.rentInput.user,
                car: args.rentInput.car,
                pickUpLocation: args.rentInput.pickUpLocation,
                dropOffLocation: args.rentInput.dropOffLocation,
                startDate: args.rentInput.startDate,
                endDate: args.rentInput.endDate,
                status: 0,
                remarks: args.rentInput.remarks,
                price: args.rentInput.price,
                createdAt: date,
                updatedAt: date,
            });

            const result = await rent.save();

            const invoice = new Invoice({
                createdAt: date,
                user: args.rentInput.user,
                rent: result._id,
                url: `/public/invoices/test-${date}.pdf`
            });

            const invoiceResult = await invoice.save();

            const foundRent = await Rent.findByIdAndUpdate({_id: result._id}, {invoice: invoiceResult._id});
            if (!foundRent) {
                throw new Error('Rent does not exist!');
            }

            return {...result._doc, ...foundRent};
        } catch (err) {
            throw err;
        }
    },
    rentsByUser: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const rents = await Rent.find({user: args.userId});

            const ObjectId = require('mongoose').Types.ObjectId;
            ObjectId.prototype.valueOf = function () {
                return this.toString();
            };
            return rents.map(rent => {
                return transformRent(rent);
            });
        } catch (err) {
            throw err;
        }
    },

    rents: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
        try {
            const rents = await Rent.find();
            const ObjectId = require('mongoose').Types.ObjectId;
            ObjectId.prototype.valueOf = function () {
                return this.toString();
            };
            return rents.map(rent => {
                return transformRent(rent);
            });
        } catch (err) {
            throw err;
        }
    },

    updateRent: async args => {
        const date = Date.now();

        const rent = await Rent.findByIdAndUpdate(
            {_id: args.rentId},
            {...args.rentUpdate, updatedAt: date});
        if (!rent) {
            throw new Error('Rent does not exist!');
        }
        if (args.rentUpdate.status === 1) {
            await Invoice.findOneAndUpdate({rent: args.rentId}, {payedAt: date});
        }
        return rent;
    }
};
