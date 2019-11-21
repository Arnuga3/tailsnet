import {
    login,
    register
} from '../api/user';
  
const SAVE_USER_ACCOUNT = 'SAVE_USER_ACCOUNT';

export const storeUserAccount = value => ({
    type: SAVE_USER_ACCOUNT,
    value
});

export function loginAndStoreUserAccount(email, password) {
    return dispatch => {
        login(email, password)
            .then(data => dispatch(storeUserAccount(data)))
            .catch(err => console.error(err));
    }
};

export function registerAndStoreUserAccount(data) {
    return dispatch => {
        register(data)
            .then(data => dispatch(storeUserAccount(data)))
            .catch(err => console.error(err));
    }
};