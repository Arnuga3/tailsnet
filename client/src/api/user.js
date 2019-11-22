import AuthAPI from './utils/AuthAPI';
import PublicAPI from './utils/PublicAPI';

export function login(email, password) {
    return PublicAPI.post('/auth/local', { email, password })
        .then(res => {
            const token = res.headers.tntoken;
            if (token) localStorage.setItem('tntoken', token);
        }).catch(err => err);
}

export function register(data) {
    return PublicAPI.post('/auth/local/register', data)
        .then(({ data, headers }) => {
            const token = headers.tntoken;
            if (token) localStorage.setItem('tntoken', token);
            return data;
        }).catch(err => err);
}

export function getProfile() {
    return AuthAPI.get('/api/users/profile')
        .then(({ data }) => data)
        .catch(err => err);
}