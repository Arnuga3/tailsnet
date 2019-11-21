const jwt = require('jsonwebtoken');

module.exports = {

    createToken: (userId) => {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: 86400 });
    },

    vaidateToken: (req, res, next) => {
        let token = req.headers['tntoken'];
        if (!token)
            return res.status(401).send({ message: 'No token provided' });

        if (token.startsWith('Bearer '))
            token = token.slice(7, token.length);

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.status(401).send({ message: 'Failed to authenticate token' });

            // Add user's id to request to make it available for other actions
            req.userId = decoded.id;
            next();
        });
    }
};