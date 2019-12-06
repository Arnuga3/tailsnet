import axios from 'axios';
import ApiUtils from './ApiUtils';

axios.interceptors.request.use(config => {
    const options = ApiUtils.getOptions();  // Attach token to every request
    return {...config, ...options};
});

export default class API {

    static get({ url, dispatch }) {
        return ApiUtils.send(
            axios.get(url),
            dispatch
        );
    }

    static post({ url, data, dispatch }) {
        return ApiUtils.send(
            axios.post(url, data),
            dispatch
        );
    }

    static put({ url, data, dispatch }) {
        return ApiUtils.send(
            axios.put(url, data),
            dispatch
        );
    }
}
