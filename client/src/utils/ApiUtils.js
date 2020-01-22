import AuthUtils from './AuthUtils';
import { setAuthencated } from './../actions/userActions';
import { sendNotification } from './notification';

export const _get = (url) => ({
    method: 'get',
    url
});

export const _post = ({ url, data, options }) => ({
    method: 'post',
    url,
    data,
    options
});

export const _put = ({ url, data, options }) => ({
    method: 'put',
    url,
    data,
    options
});

export const _delete = (url, data) => ({
    method: 'delete',
    url,
    data
});

export const logout = dispatch => {
    AuthUtils.logout();
    dispatch(setAuthencated(false));
};

export const handleSuccessfulAuthRequest = (dispatch, token) => {
    AuthUtils.saveToken(token);
    dispatch(setAuthencated(true));
};

export const handleFailedRequest = (dispatch, error) => {
    if (error.response.status === 401) {
        dispatch(setAuthencated(false));

        const isLoginScreen = window.location.pathname === '/login';
        if (!isLoginScreen) {
            AuthUtils.logout();
            window.location.replace('/login');
        }
    }
    sendNotification({
        dispatch,
        type: 'error',
        msg: `${error.response.status}: ${error.response.statusText}`
    });
}