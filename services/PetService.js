const Pet = require('../database/models/Pet');
   
module.exports = {
    async createPet(pet) {
        return await Pet.create(pet)
            .catch(error => error);
    }
}