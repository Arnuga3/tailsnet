const pg = require('./../../database/postgresql');

module.exports = {

    getPetById(id) {
        return pg.query({
            text: `
                SELECT id, type, name, dob, profile_image
                FROM pet
                WHERE id = $1
            `,
            values: [id]
        });
    },
    
    createPet(pet, userId) {
        const { petType, petName, dob, profile_image } = pet;
        return pg.query({
            text: `
                INSERT INTO pet(type, name, dob, profile_image, owner_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id, type, name, dob, profile_image
            `,
            values: [petType, petName, dob, '', userId]
        });
    },

    uploadPetProfileImage(userId, petId, image, uniqueImageName) {

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
                UPDATE pet
                SET profile_image = $1, owner_id = $2 
                WHERE id = $3
            `;
            const values = [uniqueImageName, userId, petId];
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