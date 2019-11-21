const bcrypt = require('bcryptjs');
const AuthToken = require('./../auth/AuthToken');
const User = require('./../database/models/User');

const getUserDTO = user => {
    const { _id, password, ...theRest } = user._doc;
    return theRest;
};

module.exports = {

    async login(email, password) {
        const user = await User.findOne(email)
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
        const user = await User.findById(id)
            .catch(error => error);
        return getUserDTO(user)
    },

    async createUser(data) {
        const { password } = data;
        const hashedPassword = bcrypt.hashSync(password, 8);
        // TODO: Check email if it registered already
        const user = await User.create({
			...data,
			password: hashedPassword
        }).catch(error => error);
        return getUserDTO(user);
    }
};