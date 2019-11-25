const SAVE_USER_ACCOUNT = 'SAVE_USER_ACCOUNT';

const defaultState = {
    account: null
};

const userStore = (state = defaultState, { type, value }) => {

    switch (type) {
        case SAVE_USER_ACCOUNT:
            return {
                ...state,
                account: {...state.accounts, ...value}
            }
        
        default:
            return state;
    }
};

export default userStore;