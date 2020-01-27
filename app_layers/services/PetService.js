const PetDataAccess = require('./../data_access/PetDataAccess');
const Utils = require('./../../utils/Utils');
   
module.exports = {
    
    createPet(pet, userId) {
        return PetDataAccess.createPet(pet, userId);
    },

    uploadPetProfileImage(userId, image) {
        const uniqueImageName = Utils.uuid();
        return PetDataAccess.uploadUserProfileImage(userId, image, uniqueImageName);
    }
}