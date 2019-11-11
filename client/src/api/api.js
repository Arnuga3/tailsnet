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