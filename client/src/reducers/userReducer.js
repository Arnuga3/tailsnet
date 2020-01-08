import {
    SAVE_USER_ACCOUNT,
    EDIT_USER_ACCOUNT,
    SET_AUTH,
    LOGOUT,
    SAVE_USER_PETS
} from './../actions/userActions';

const defaultState = {
    account: null,
    authenticated: null,
    pets: []
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
        
        case SET_AUTH:
            return {
                ...state,
                authenticated: value
            }
        
        case LOGOUT:
            return {
                ...state,
                account: null
            }
        
        case SAVE_USER_PETS:
            return {
                ...state,
                pets: value
            }
        
        default:
            return state;
    }
};

export default userStore;