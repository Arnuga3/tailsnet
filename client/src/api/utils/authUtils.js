const TOKEN = 'tntoken';

function getToken() {
    return localStorage.getItem(TOKEN);
}

function removeToken() {
    localStorage.removeItem(TOKEN);
}

export function saveToken(token) {
    if (token) localStorage.setItem(TOKEN, token);
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
