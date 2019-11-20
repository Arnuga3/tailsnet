import AuthAPI from './utils/AuthAPI';

export function getPetAccounts() {
    return new Promise((resolve, reject) => {
        AuthAPI.get('/api/pets')
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
}

export function createPetAccount(account) {
    return new Promise((resolve, reject) => {
        AuthAPI.post('/api/pets/create', account)
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
}