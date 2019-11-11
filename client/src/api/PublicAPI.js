import axios from 'axios';

export default class PublicAPI {

    static get(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }

    static post(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(url, data)
                .then(res => resolve(res))
                .catch(err => reject(err));
        });
    }
}
