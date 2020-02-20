import { SAVE_PET_ACCOUNT, STORE_PET_ACCOUNTS, STORE_PET_DATA }  from './../actions/petActions';

const defaultState = {
    accounts: [],
    petsData: {}
};

const petStore = (state = defaultState, { type, value }) => {

    switch (type) {
        case SAVE_PET_ACCOUNT:
            return {
                ...state,
                accounts: [...state.accounts, value]
            }

        case STORE_PET_ACCOUNTS:
            return {
                ...state,
                accounts: value
            }

        case STORE_PET_DATA:
            return {
                ...state,
                petsData: {...state.petsData, [value.id]: value}
            }
        
        default:
            return state;
    }
};

export default petStore;