import { _get, _post } from './../utils/ApiUtils';
import { sendNotification } from './../utils/notification';

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
			request: _post({
				url: '/api/pets/create',
				data
			}),
			options: {
				onSuccess({ dispatch, response }) {
                    dispatch(storePetAccounts(response.data));
                }
			}
		}
	}
}

export function uploadPetProfileImage(data) {
    return {
        type: 'UPLOAD PET PROFILE IMAGE',
        payload: {
            request: _post({
                url: '/api/pets/upload-profile-image',
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