  import {
    getPetAccounts
} from './../api/api';

const SAVE_PET_ACCOUNT = 'SAVE_PET_ACCOUNT';

export const createPetAccount = petAccount => ({
    type: SAVE_PET_ACCOUNT,
    value: petAccount
});