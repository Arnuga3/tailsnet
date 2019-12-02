import AuthAPI from './utils/AuthAPI';
import PublicAPI from './utils/PublicAPI';
import AuthUtils from './utils/AuthUtils';

export function login(email, password) {
        const request = PublicAPI.post('/auth/local', { email, password });
        return AuthUtils.validateResponse(request);
        
            // .then(({ data, headers }) => {
            //     AuthUtils.saveToken(headers.tntoken);
            //     return resolve(data);
            // }).catch(err => reject(err));
}

export function register(data) {
    return new Promise((resolve, reject) => {
        PublicAPI.post('/auth/local/register', data)
            .then(({ data, headers }) => {
                AuthUtils.saveToken(headers.tntoken);
                return resolve(data);
            }).catch(err => reject(err));
    });
}

export function getProfile() {
    const response = AuthAPI.get('/api/users/profile');
    return AuthUtils.validateResponse(response);
}

export function updateProfile(data) {
    return new Promise((resolve, reject) => {
        AuthAPI.put('/api/users/profile', data)
            .then(({ data }) => resolve(data))
            .catch(err => reject(err));
    });
}