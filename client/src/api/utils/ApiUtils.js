import Constants from '../../utils/Constants';
import { saveToken, removeToken } from '../../actions/authActions';

const TOKEN = Constants.TOKEN;

export default class ApiUtils {

    static send(request, dispatch) {
        return request
            .then(res =>
                Promise.resolve(this.handleResponse(dispatch, res)))
            .catch(err => 
                this.handleError(dispatch, err));
    }

    static handleResponse(dispatch, res) {
        const { data, headers } = res;
        const token = headers[TOKEN];

        if (token)
            dispatch(saveToken(token));
        return data;
    }

    static handleError(dispatch, err) {
        const statusCode = err.response.status;

        if (statusCode === 401)
            dispatch(removeToken());
    }

    static getOptions() {
        const token = localStorage.getItem(TOKEN);
        const options = {
            headers: {
                tntoken: `Bearer ${token}`,
                xsrfCookieName: 'XSRF-TOKEN',
                xsrfHeaderName: 'X-XSRF-TOKEN'
            }
        };
        return options;
    }
}