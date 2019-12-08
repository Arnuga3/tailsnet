import {
    SAVE_USER_ACCOUNT,
    EDIT_USER_ACCOUNT,
    LOGOUT
} from './../actions/userActions';

const defaultState = {
    account: null
};

const userStore = (state = defaultState, { type, value }) => {

    switch (type) {
        case SAVE_USER_ACCOUNT:
            return {
                ...state,
                account: {...state.account, ...value}
            }

        case EDIT_USER_ACCOUNT:
            return {
                ...state,
                account: {...state.account, ...value}
            }
        
        case LOGOUT:
            return {
                ...state,
                account: null
            }
        
        default:
            return state;
    }
};

export default userStore;