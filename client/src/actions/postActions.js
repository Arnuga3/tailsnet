import { _get, _post } from './../utils/ApiUtils';
import { sendNotification } from './../utils/notification';

export const STORE_POSTS = 'STORE_POSTS';
export const STORE_NEW_POST = 'STORE_NEW_POST';

export const storePosts = value => ({
	type: STORE_POSTS,
	value
});

export const storeNewPost = value => ({
	type: STORE_NEW_POST,
	value
});

export function getAndStorePosts(petId) {
	return {
		type: 'GET_PET_POSTS',
		payload: {
			request: _get({
				url: `/api/post/${petId}`
			}),
			options: {
				onSuccess({ dispatch, response }) {
                    dispatch(storePosts({ id: petId, data: response.data }));
                }
			}
		}
	}
}

export function createAndStorePost(data) {
	return {
		type: 'CREATE_POST',
		payload: {
			request: _post({
				url: '/api/post',
				data
			}),
			options: {
				onSuccess({ dispatch, response }) {
                    dispatch(storeNewPost({id: response.data.pet_id, data: [response.data]}));
                    sendNotification({ dispatch, type: 'success' });
                }
			}
		}
	}
}