  import {
    getPetAccounts
} from './../api/api';

const GET_ACCOUNTS = 'GET_ACCOUNTS';

export const savePetAccounts = petAccounts => ({
    type: GET_ACCOUNTS,
    value: petAccounts
});

export function retrievePetAccounts() {
    return dispatch => {
        getPetAccounts()
            .then(data => dispatch(savePetAccounts(data)))
            .catch(err => console.log(err));
    }
}