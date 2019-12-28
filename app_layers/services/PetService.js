const PetDataAccess = require('./../data_access/PetDataAccess');
   
module.exports = {
    
    createPet(pet, userId) {
        return PetDataAccess.createPet(pet, userId);
    }
}