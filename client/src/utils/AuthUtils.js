import Constants from './Constants';
const TOKEN = Constants.TOKEN;

export default class AuthUtils {

    static saveToken(token) {
        localStorage.setItem(TOKEN, token);
    }

    static getToken() {
        return localStorage.getItem(TOKEN);
    }

    static removeToken() {
        localStorage.removeItem(TOKEN);
    }

    static logout() {
        this.removeToken();
    }

    static hasToken() {
        return this.getToken() !== null;
    }
}