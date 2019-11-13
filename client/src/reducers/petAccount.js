const GET_ACCOUNTS = 'GET_ACCOUNTS';

const defaultState = {
    accounts: null
};

const pets = (state = defaultState, { type, value }) => {

    switch (type) {
        case GET_ACCOUNTS:
            return {
                ...state,
                accounts: value
            }
        
        default:
            return state;
    }
}

export default pets;