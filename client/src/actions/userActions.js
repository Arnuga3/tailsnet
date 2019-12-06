import {
    register,
    getProfile,
    updateProfile
} from '../api/user';
//TODO REPLACE actions to use redux-axios middleware
const SAVE_USER_ACCOUNT = 'SAVE_USER_ACCOUNT';
const EDIT_USER_ACCOUNT = 'EDIT_USER_ACCOUNT';

export const storeUserAccount = value => ({
    type: SAVE_USER_ACCOUNT,
    value
});

export const editUserAccount = value => ({
    type: EDIT_USER_ACCOUNT,
    value
});

export function retrieveAndStoreUserAccount() {
    return dispatch => {
        getProfile(dispatch)
            .then(data => data && dispatch(storeUserAccount(data)));
    }
};

export function updateAndStoreUserAccount(data) {
    return dispatch => {
        updateProfile(dispatch, data)
            .then(data => data && dispatch(storeUserAccount(data)));
    }
};

export function registerAndStoreUserAccount(data) {
    return dispatch => {
        register(dispatch, data)
            .then(data => data && dispatch(storeUserAccount(data)));
    }
};

export function loginAndStoreUserAccount(email, password) {
    return {
        type: 'LOGIN',
        payload: {
            request: {
                method: 'post',
                url: '/auth/local',
                data: { email, password }
            },
            options: {
                onSuccess({ dispatch, response }) {
                    const { data } = response;
                    dispatch(storeUserAccount(data));
                }
            }
        }
    }
}