import Constants from './../utils/Constants';
const TOKEN = Constants.TOKEN;

const CHECK_TOKEN = 'CHECK_TOKEN';
const SAVE_TOKEN = 'SAVE_TOKEN';
const REMOVE_TOKEN = 'REMOVE_TOKEN';

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

        case REMOVE_TOKEN:
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