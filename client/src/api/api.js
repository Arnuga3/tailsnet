import AuthAPI from './AuthAPI';
import PublicAPI from './PublicAPI';

export function login(email, password) {
    return PublicAPI.post('/auth/local', { email, password });
}

export function getProfile() {
    return AuthAPI.get('/api/users/profile')
        .then(({ data }) => data)
        .catch(err => err);
}

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
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
}