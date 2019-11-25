const User = require('../../database/models/User');

module.exports = {

    async getUserByEmail(email) {
        return await User.findOne(email)
            .catch(error => error);
    },
    
    async getUserById(id) {
        return await User.findById(id)
            .catch(error => error);
    },

    async createUser(data) {
        return await User.create(data).catch(error => error);
    }
};