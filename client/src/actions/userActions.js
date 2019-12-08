import { _get, _post, _put } from './../utils/ApiUtils';
export const SAVE_USER_ACCOUNT = 'SAVE_USER_ACCOUNT';
export const EDIT_USER_ACCOUNT = 'EDIT_USER_ACCOUNT';
export const LOGOUT = 'LOGOUT';

export const storeUserAccount = value => ({
    type: SAVE_USER_ACCOUNT,
    value
});

export const editUserAccount = value => ({
    type: EDIT_USER_ACCOUNT,
    value
});

export const logout = value => ({
    type: LOGOUT,
    value
});

export function retrieveAndStoreUserAccount() {
    return {
        type: 'GET_USER_PROFILE',
        payload: {
            request: _get('/api/users/profile'),
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
            request: _put('/api/users/profile', data),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storeUserAccount(response.data));
                }
            }
        }
    }
}

export function registerAndStoreUserAccount(data) {
    return {
        type: 'REGISTER',
        payload: {
            request: _post('/auth/local/register', data),
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
            request: _post('/auth/local', { email, password }),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storeUserAccount(response.data));
                }
            }
        }
    }
}
