import history from './../history';

const tntoken = 'tntoken';

function getToken() {
    return localStorage.getItem(tntoken);
}

function removeToken() {
    localStorage.removeItem(tntoken);
    goTologin();
}

function goTologin() {
    history.push('/login');
}

export function getOptions() {
    const token = getToken();
    const options = {
        headers: {
            tntoken: `Bearer ${token}`
        }
    };
    return options;
}

export function handleError(err) {
    removeToken();
    return err;
}
