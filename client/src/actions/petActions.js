import { _get, _post } from './../utils/ApiUtils';
import { sendNotification } from './../utils/notification';

export const SAVE_PET_ACCOUNT = 'SAVE_PET_ACCOUNT';
export const STORE_PET_ACCOUNTS = 'SAVE_PET_ACCOUNTS';
export const STORE_PET_DATA = 'STORE_PET_DATA';

export const storeNewPetAccount = value => ({
	type: SAVE_PET_ACCOUNT,
	value
});

export const storePetAccounts = value => ({
	type: STORE_PET_ACCOUNTS,
	value
});

export const storePetData = value => ({
	type: STORE_PET_DATA,
	value
});

export function retrieveAndStorePetData(id) {
    return {
        type: 'GET_PET_DATA',
        payload: {
            request: _get({ url: `/api/pet/${id}` }),
            options: {
                onSuccess({ dispatch, response }) {
                    dispatch(storePetData(response.data));
                }
            }
        }
    }
}

export function createAndStorePetDetails(data) {
	return {
		type: 'CREATE_PET_PROFILE',
		payload: {
			request: _post({
				url: '/api/pet/create',
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

export function uploadPetProfileImage(data, history) {
    return {
        type: 'UPLOAD_PET_PROFILE_IMAGE',
        payload: {
            request: _post({
                url: '/api/pet/upload-profile-image',
                data,
                options: {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            }),
            options: {
                onSuccess({ dispatch, response }) {
					sendNotification({ dispatch, type: 'success' });
					history.push('/user/pets');
                }
            }
        }
    }
}

export function createAndStorePetDetailsAndImage(data, imageFormData, history) {
    return {
		type: 'CREATE_PET_PROFILE',
		payload: {
			request: _post({
				url: '/api/pet/create',
				data
			}),
			options: {
				onSuccess({ dispatch, response }) {
                    imageFormData.append('petId', response.data.id);
                    dispatch(uploadPetProfileImage(imageFormData, history));
                    dispatch(storePetAccounts(response.data));
                }
			}
		}
	}
}