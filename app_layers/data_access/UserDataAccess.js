const pg = require('./../../database/postgresql');

module.exports = {

    getUserByEmail(email) {
        return pg.query({
            text: `
                SELECT id, title, name, surname, dob, email, password
                FROM users
                WHERE email = $1
            `,
            values: [email]
        });
    },
    
    getUserById(id) {
        return pg.query({
            text: `
                SELECT title, name, surname, dob, email
                FROM users
                WHERE id = $1
            `,
            values: [id]
        });
    },

    createUser({ title, name, surname, dob, email, password }) {
        return pg.query({
            text: `
                INSERT INTO users(title, name, surname, dob, email, password)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING title, name, surname, dob, email
            `,
            values: [title, name, surname, dob, email, password]
        });
    },

    getUserPets(userId) {
        return pg.query({
            text: `
                SELECT id, type, name, dob, profile_image
                FROM pets
                WHERE user_id = $1
            `,
            values: [userId]
        });
    },
};