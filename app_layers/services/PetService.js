const PetDataAccess = require('./../data_access/PetDataAccess');
const Utils = require('./../../utils/Utils');
   
module.exports = {
    
    createPet(pet, userId) {
        return PetDataAccess.createPet(pet, userId);
    },

    uploadPetProfileImage(userId, petId, image) {
        const uniqueImageName = Utils.uuid();
        return PetDataAccess.uploadPetProfileImage(userId, petId, image, uniqueImageName);
    }
}