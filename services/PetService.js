const Pet = require('../database/models/Pet');
   
module.exports = {
    async getAllPets() {
        return await Pet.find({})
            .catch(error => error);
    },
    async createPet(pet) {
        return await Pet.create(pet)
            .catch(error => error);
    }
}