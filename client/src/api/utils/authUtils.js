const TOKEN = 'tntoken';

export default class AuthUtils {

    static validateResponse(response) {
        return new Promise((resolve, reject) => {
            response.then(res => {
                debugger
                resolve(res)
            }).catch(err => {
                debugger
                reject(err);
            });
        });
    }

    static getOptions() {
        const token = this.getToken();
        const options = {
            headers: {
                tntoken: `Bearer ${token}`
            }
        };
        return options;
    }

    getToken() {
        return localStorage.getItem(TOKEN);
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }
}