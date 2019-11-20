import axios from 'axios';
import { getOptions, handleError } from './authUtils';

export default class AuthAPI {

    static get(url) {
        const options = getOptions();
        return new Promise((resolve, reject) => {
            axios.get(url, options)
                .then(res => resolve(res))
                .catch(err => reject(handleError(err)));
        });
    }

    static post(url, data) {
        const options = getOptions();
        return new Promise((resolve, reject) => {
            axios.post(url, data, options)
                .then(res => resolve(res))
                .catch(err => reject(handleError(err)));
        });
    }
}
