import { _get, _post, _put } from './../utils/ApiUtils';
import { sendNotification } from './../utils/notification';

export const SAVE_USER_ACCOUNT = 'SAVE_USER_ACCOUNT';
export const EDIT_USER_ACCOUNT = 'EDIT_USER_ACCOUNT';
export const SET_AUTH = 'SET_AUTH';
export const LOGOUT = 'LOGOUT';
export const SAVE_USER_PETS = 'SAVE_USER_PETS';


export const storeUserAccount = value => ({
    type: SAVE_USER_ACCOUNT,
    value
});

export const editUserAccount = value => ({
    type: EDIT_USER_ACCOUNT,
    value
});

export const setAuthencated = value => ({
    type: SET_AUTH,
    value
});

export const logout = () => ({
    type: LOGOUT
});

export const storeUserPets = value => ({
    type: SAVE_USER_PETS,
    value
});

export function retrieveAndStoreUserAccount() {
    return {
        type: 'GET_USER_PROFILE',
        payload: {
            request: _get({ url: '/api/user/profile' }),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storeUserAccount(response.data));
                }
            }
        }
    }
}

export function updateAndStoreUserAccount(data) {
    return {
        type: 'UPDATE_USER_PROFILE',
        payload: {
            request: _put({
                url: '/api/user/profile',
                data
            }),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storeUserAccount(response.data));
                    sendNotification({ dispatch, type: 'success' });
                }
            }
        }
    }
}

export function registerAndStoreUserAccount(data) {
    return {
        type: 'REGISTER',
        payload: {
            request: _post({
                url: '/auth/local/register',
                data
            }),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storeUserAccount(response.data));
                }
            }
        }
    }
}

export function loginAndStoreUserAccount(email, password) {
    return {
        type: 'LOGIN',
        payload: {
            request: _post({
                url: '/auth/local',
                data: { email, password }
            }),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storeUserAccount(response.data));
                }
            }
        }
    }
}

export function uploadUserProfileImage(data) {
    return {
        type: 'UPLOAD PROFILE IMAGE',
        payload: {
            request: _post({
                url: '/api/user/upload-profile-image',
                data,
                options: {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            }),
            options: {
                onSuccess({ dispatch, response }) {
                    sendNotification({ dispatch, type: 'success' });
                }
            }
        }
    }
}

export function retrieveAndStoreUserPets() {
    return {
        type: 'GET_USER_PETS',
        payload: {
            request: _get({ url: '/api/user/pets' }),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storeUserPets(response.data));
                }
            }
        }
    }
}