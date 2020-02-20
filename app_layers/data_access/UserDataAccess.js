const pg = require('./../../database/postgresql');

module.exports = {

    getUserByEmail(email) {
        return pg.query({
            text: `
                SELECT id, title, name, surname, dob, email, password, profile_image
                FROM users
                WHERE email = $1
            `,
            values: [email]
        });
    },

    getUserById(id) {
        return pg.query({
            text: `
                SELECT title, name, surname, dob, email, profile_image
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

    updateUser({ id, title, name, surname, dob }) {
        return pg.query({
            text: `
                UPDATE users
                SET title=$2, name=$3, surname=$4, dob=$5
                WHERE id = $1
                RETURNING title, name, surname, dob, email
            `,
            values: [id, title, name, surname, dob]
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

    uploadUserProfileImage(userId, image, uniqueImageName) {
        const error = (err, client) => {
            console.error('Error in transaction', err.stack);
            client.query('ROLLBACK')
                .catch(err => {
                    console.error('Error rolling back client', err.stack);
                    return Promise.reject(err);
                });
            return Promise.reject(err);
        };

        const updateProfileImage = (client, uniqueImageName, userId) => {
            const updateProfileImageText = `
                UPDATE pets
                SET profile_image = $1
                WHERE id = $2
            `;
            const values = [uniqueImageName, userId];
            return client.query(updateProfileImageText, values);
        };

        const uploadImage = (uniqueImageName) => {
            // TODO - Delete the one that will be replaced if any
            image.avatarImage.mv(`temp/${uniqueImageName}.jpg`);
        }

        return pg.pool().connect()
            .then(res => {
                const client = res;
                return client.query('BEGIN')
                    .then(() => updateProfileImage(client, uniqueImageName, userId)).catch(err => error(err, client))
                    .then(() => uploadImage(uniqueImageName)).catch(err => error(err, client))
                    .then(() => client.query('COMMIT'))
                    .catch(err => error(err, client));
            })
            .catch(err => error(err, client));
    }
};