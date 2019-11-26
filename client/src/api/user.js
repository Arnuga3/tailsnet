import AuthAPI from './utils/AuthAPI';
import PublicAPI from './utils/PublicAPI';

function saveToken(token) {
    if (token) localStorage.setItem('tntoken', token);
}

export function login(email, password) {
    return PublicAPI.post('/auth/local', { email, password })
        .then(({ data, headers }) => {
            saveToken(headers.tntoken);
            return data;
        }).catch(err => err);
}

export function register(data) {
    return PublicAPI.post('/auth/local/register', data)
        .then(({ data, headers }) => {
            saveToken(headers.tntoken);
            return data;
        }).catch(err => err);
}

// TODO - Fix error handling as the error response is geting saved to redux store
export function getProfile() {
    return AuthAPI.get('/api/users/profile')
        .then(({ data }) => data)
        .catch(err => err);
}

export function updateProfile(data) {
    return AuthAPI.put('/api/users/profile', data)
        .then(({ data }) => data)
        .catch(err => err);
}