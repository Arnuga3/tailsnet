import AuthAPI from './utils/AuthAPI';
import PublicAPI from './utils/PublicAPI';
import { saveToken } from './utils/authUtils';

export function login(email, password) {
    return new Promise((resolve, reject) => {
        PublicAPI.post('/auth/local', { email, password })
            .then(({ data, headers }) => {
                saveToken(headers.tntoken);
                return resolve(data);
            }).catch(err => reject(err));
    });
}

export function register(data) {
    return new Promise((resolve, reject) => {
        PublicAPI.post('/auth/local/register', data)
            .then(({ data, headers }) => {
                saveToken(headers.tntoken);
                return resolve(data);
            }).catch(err => reject(err));
    });
}

export function getProfile() {
    return new Promise((resolve, reject) => {
        AuthAPI.get('/api/users/profile')
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
}

export function updateProfile(data) {
    return new Promise((resolve, reject) => {
        AuthAPI.put('/api/users/profile', data)
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
}