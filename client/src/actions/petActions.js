import { _get, _post, _put, _delete } from './../utils/ApiUtils';

const SAVE_PET_ACCOUNT = 'SAVE_PET_ACCOUNT';
const SAVE_PET_ACCOUNTS = 'SAVE_PET_ACCOUNTS';

export const storeNewPetAccount = value => ({
	type: SAVE_PET_ACCOUNT,
	value
});

export const storePetAccounts = value => ({
	type: SAVE_PET_ACCOUNTS,
	value
});

export function getAndStoreAllPetAccounts() {
	return {
        type: 'GET_PET_PROFILES',
        payload: {
            request: _get('/api/pets'),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storePetAccounts(response.data));
                }
            }
        }
    }
};

export function createAndStorePetAccount(data) {
	return {
		type: 'CREATE_PET_PROFILE',
		payload: {
			request: _post('/api/pets/create', data),
			options: {
				onSuccess({ dispatch, response }) {
                    dispatch(storePetAccounts(response.data));
                }
			}
		}
	}
};