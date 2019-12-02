const CHECK_TOKEN = 'CHECK_TOKEN';
const TOKEN = 'tntoken';

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
        
        default:
            return state;
    }
};

export default authStore;