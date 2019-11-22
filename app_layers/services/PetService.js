const PetDataAccess = require('./../data_access/UserDataAccess');
   
module.exports = {

    async getAllPets() {
        return await PetDataAccess.getAllPets()
            .catch(error => error);
    },
    
    async createPet(pet) {
        return await PetDataAccess.createPet(pet)
            .catch(error => error);
    }
}