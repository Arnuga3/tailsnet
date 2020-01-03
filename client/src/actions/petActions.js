import { _get, _post } from './../utils/ApiUtils';
export const SAVE_PET_ACCOUNT = 'SAVE_PET_ACCOUNT';
export const SAVE_PET_ACCOUNTS = 'SAVE_PET_ACCOUNTS';

export const storeNewPetAccount = value => ({
	type: SAVE_PET_ACCOUNT,
	value
});

export const storePetAccounts = value => ({
	type: SAVE_PET_ACCOUNTS,
	value
});

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