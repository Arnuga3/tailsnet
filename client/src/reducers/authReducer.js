import Constants from './../utils/Constants';
import {
    CHECK_TOKEN,
    SAVE_TOKEN,
    LOGOUT
} from './../actions/authActions';

const TOKEN = Constants.TOKEN;

const defaultState = {
    token: localStorage.getItem(TOKEN)
};

const authStore = (state = defaultState, { type, value }) => {

    switch (type) {
        case CHECK_TOKEN:
            return {
                ...state,
                token: localStorage.getItem(TOKEN)
            }

        case SAVE_TOKEN:
            localStorage.setItem(TOKEN, value);
            return {
                ...state,
                token: value
            }

        case LOGOUT:
            localStorage.removeItem(TOKEN);
            return {
                ...state,
                token: null
            }
        
        default:
            return state;
    }
};

export default authStore;