const bcrypt = require('bcryptjs');
const AuthToken = require('./../../auth/AuthToken');
const UserDataAccess = require('./../data_access/UserDataAccess');
const Utils = require('./../../utils/Utils');

const getUserDTO = user => {
    delete user.id;
    delete user.password;
    return user;
};

module.exports = {

    login(email, password) {
        return UserDataAccess.getUserByEmail(email)
            .then(user => {
                const aUser = user[0];  // postgresql single result row
                const validPassword = bcrypt.compareSync(password, aUser.password);
                if (!validPassword) return null;

                const token = AuthToken.createToken(aUser.id);
                aUser.token = token;
                return getUserDTO(aUser);
            })
            .catch(error => error);
    },
    
    getUser(id) {
        return UserDataAccess.getUserById(id);
    },

    createUser(data) {
        const { password } = data;
        const hashedPassword = bcrypt.hashSync(password, 8);
        return UserDataAccess.createUser({ ...data, password: hashedPassword });
    },

    updateUser(data) {
        return UserDataAccess.updateUser(data);
    },

    getUserPets(userId) {
        return UserDataAccess.getUserPets(userId);
    },

    uploadUserProfileImage(userId, image) {
        const uniqueImageName = Utils.uuid();
        return UserDataAccess.uploadUserProfileImage(userId, image, uniqueImageName);
    }
};