const User = require('../../models/user');

module.exports = {
    users: async () => {
        try {
            const users = await User.find();
            const ObjectId = require('mongoose').Types.ObjectId;
            ObjectId.prototype.valueOf = function () {
                return this.toString();
            };
            return users
        } catch (err) {
            throw err;
        }
    },
};
