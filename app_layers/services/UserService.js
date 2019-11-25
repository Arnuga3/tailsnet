const bcrypt = require('bcryptjs');
const AuthToken = require('./../../auth/AuthToken');
const UserDataAccess = require('./../data_access/UserDataAccess');

const getUserDTO = user => {
    const { _id, password, ...theRest } = user._doc;
    return theRest;
};

module.exports = {

    async login(email, password) {
        const user = await UserDataAccess.getUserByEmail(email)
            .catch(error => error);

        if (!user) return null;
        
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) return null;

        const token = AuthToken.createToken(user.id);
        const userDTO = getUserDTO(user);
        userDTO.token = token;
        return userDTO;
    },
    
    async getUser(id) {
        const user = await UserDataAccess.getUserById(id)
            .catch(error => error);
        return getUserDTO(user)
    },

    async createUser(data) {
        const { email, password } = data;

        const user = await UserDataAccess.getUserByEmail(email);
        if (user) throw new Error('Email is already registered');

        const hashedPassword = bcrypt.hashSync(password, 8);
        const aUser = await UserDataAccess.createUser({
			...data,
			password: hashedPassword
        }).catch(error => error);
        return getUserDTO(aUser);
    }
};