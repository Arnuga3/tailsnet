import {
	getPetAccounts,
	createPetAccount
} from '../api/pet';

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
	return dispatch => {
		getPetAccounts()
			.then(data => dispatch(storePetAccounts(data)))
			.catch(err => console.error(err));
	}
};

export function createAndStorePetAccount(petAccount) {
	return dispatch => {
		createPetAccount(petAccount)
			.then(data => dispatch(storeNewPetAccount(data)))
			.catch(err => console.error(err));
	}
};