import API from './utils/API';

export function login(dispatch, email, password) {
    return API.post({
        url: '/auth/local',
        data: { email, password },
        dispatch
    });
}

export function register(dispatch, data) {
    return API.post({
        url: '/auth/local/register',
        data,
        dispatch
    });
}

export function getProfile(dispatch) {
    return API.get({
        url: '/api/users/profile',
        dispatch
    });
}

export function updateProfile(dispatch, data) {
    return API.put({
        url: '/api/users/profile',
        data,
        dispatch
    });
}