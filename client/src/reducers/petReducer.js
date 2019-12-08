import { SAVE_PET_ACCOUNT, SAVE_PET_ACCOUNTS }  from './../actions/petActions';

const defaultState = {
    accounts: []
};

const petStore = (state = defaultState, { type, value }) => {

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

export default petStore;