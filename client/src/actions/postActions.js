import { _get, _post } from './../utils/ApiUtils';
import { sendNotification } from './../utils/notification';

export const STORE_POSTS = 'STORE_POSTS';

export const storePost = value => ({
	type: STORE_POSTS,
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
                    dispatch(storePost({ id: petId, data: response.data }));
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
                    dispatch(storePost(response.data));
                    sendNotification({ dispatch, type: 'success' });
                }
			}
		}
	}
}