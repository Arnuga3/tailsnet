const SAVE_PET_ACCOUNT = 'SAVE_PET_ACCOUNT';
const SAVE_PET_ACCOUNTS = 'SAVE_PET_ACCOUNTS';

const defaultState = {
    accounts: []
};

const pets = (state = defaultState, { type, value }) => {

    switch (type) {
        case SAVE_PET_ACCOUNT:
            return {
                ...state,
                accounts: [...state.accounts, value]
            }

        case SAVE_PET_ACCOUNTS:
            return {
                ...state,
                accounts: value
            }
        
        default:
            return state;
    }
};

export default pets;