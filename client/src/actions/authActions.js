export const CHECK_TOKEN = 'CHECK_TOKEN';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const LOGOUT = 'LOGOUT';

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