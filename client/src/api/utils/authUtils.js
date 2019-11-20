const tntoken = 'tntoken';

function getToken() {
    return localStorage.getItem(tntoken);
}

function removeToken() {
    localStorage.removeItem(tntoken);
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
