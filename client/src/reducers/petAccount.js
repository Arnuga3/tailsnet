const SAVE_PET_ACCOUNT = 'SAVE_PET_ACCOUNT';

const defaultState = {
    accounts: null
};

const pets = (state = defaultState, { type, value }) => {

    switch (type) {
        case SAVE_PET_ACCOUNT:
            return {
                ...state,
                accounts: [...state.accounts, value]
            }
        
        default:
            return state;
    }
}

export default pets;