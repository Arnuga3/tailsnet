const CHECK_TOKEN = 'CHECK_TOKEN';
const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';

export const checkToken = () => ({
	type: CHECK_TOKEN
});

export const saveToken = token => ({
	type: SAVE_TOKEN,
	value: token
});

export const logout = () => ({
	type: LOGOUT
});