import axios from 'axios';
import AuthUtils from './AuthUtils';

export default class AuthAPI {

    static get(url) {
        const options = AuthUtils.getOptions();
        return new Promise((resolve) => {
            axios.get(url, options)
                .then(res => resolve(res));
        });
    }

    static post(url, data) {
        const options = AuthUtils.getOptions();
        return new Promise((resolve) => {
            axios.post(url, data, options)
                .then(res => resolve(res));
        });
    }

    static put(url, data) {
        const options = AuthUtils.getOptions();
        return new Promise((resolve) => {
            axios.put(url, data, options)
                .then(res => resolve(res));
        });
    }
}
