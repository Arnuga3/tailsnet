import AuthAPI from './utils/AuthAPI';
import PublicAPI from './utils/PublicAPI';

export function login(email, password) {
    return PublicAPI.post('/auth/local', { email, password });
}

export function register(data) {
    return PublicAPI.post('/auth/local/register', data);
}

export function getProfile() {
    return AuthAPI.get('/api/users/profile')
        .then(({ data }) => data)
        .catch(err => err);
}