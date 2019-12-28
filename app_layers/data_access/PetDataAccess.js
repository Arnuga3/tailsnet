const pg = require('./../../database/postgresql');

module.exports = {
    
    createPet(pet, userId) {
        const { petType, petName, dob, profile_image } = pet;
        return pg.query({
            text: `
                INSERT INTO pets(type, name, dob, profile_image, user_id)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING type, name, dob, profile_image
            `,
            values: [petType, petName, dob, '', userId]
        });
    }
};