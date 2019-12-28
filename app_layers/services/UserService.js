const bcrypt = require('bcryptjs');
const AuthToken = require('./../../auth/AuthToken');
const UserDataAccess = require('./../data_access/UserDataAccess');

const getUserDTO = user => {
    delete user.id;
    delete user.password;
    return user;
};

module.exports = {

    login(email, password) {
        return UserDataAccess.getUserByEmail(email)
            .then(user => {
                const validPassword = bcrypt.compareSync(password, user.password);
                if (!validPassword) return null;

                const token = AuthToken.createToken(user.id);
                user.token = token;
                return getUserDTO(user);
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
    }
};