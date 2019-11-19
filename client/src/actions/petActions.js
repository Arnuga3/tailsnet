import {
  getPetAccounts,
  createPetAccount
} from './../api/api';

const SAVE_PET_ACCOUNT = 'SAVE_PET_ACCOUNT';
const SAVE_PET_ACCOUNTS = 'SAVE_PET_ACCOUNTS';

export const saveNewPetAccountToStore = value => ({
  type: SAVE_PET_ACCOUNT,
  value
});

export const savePetAccountsToStore = value => ({
  type: SAVE_PET_ACCOUNTS,
  value
});

export function retrievePetAccounts() {
  return dispatch => {
    getPetAccounts()
      .then(data => dispatch(savePetAccountsToStore(data)))
      .catch(err => console.error(err));
  }
};

export function postPetAccount(petAccount) {
  return dispatch => {
    createPetAccount(petAccount)
      .then(data => dispatch(saveNewPetAccountToStore(data)))
      .catch(err => console.error(err));
  }
};