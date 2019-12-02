const CHECK_TOKEN = 'CHECK_TOKEN';
const SAVE_TOKEN = 'SAVE_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

export const checkToken = () => ({
	type: CHECK_TOKEN
});

export const saveToken = token => ({
	type: SAVE_TOKEN,
	value: token
});

export const removeToken = () => ({
	type: REMOVE_TOKEN
});