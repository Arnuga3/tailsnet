import AuthAPI from './utils/AuthAPI';
import PublicAPI from './utils/PublicAPI';

export function login(email, password) {
    return PublicAPI.post('/auth/local', { email, password })
        .then(({ data, headers }) => {
            handleToken(headers.tntoken);
            return data;
        }).catch(err => err);
}

export function register(data) {
    return PublicAPI.post('/auth/local/register', data)
        .then(({ data, headers }) => {
            handleToken(headers.tntoken);
            return data;
        }).catch(err => err);
}

export function getProfile() {
    return AuthAPI.get('/api/users/profile')
        .then(({ data }) => data)
        .catch(err => err);
}

function handleToken(token) {
    if (token) localStorage.setItem('tntoken', token);
}