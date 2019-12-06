import API from './utils/API';

export function getPetAccounts(dispatch) {
    return API.get({
        url: '/api/pets',
        dispatch
    });
}

export function createPetAccount(dispatch, data) {
    return API.post({
        url: '/api/pets/create',
        data,
        dispatch
    });
}