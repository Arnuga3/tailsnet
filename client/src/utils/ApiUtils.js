import React from 'react';
import { enqueueSnackbar, closeSnackbar } from './../actions/notificationActions';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AuthUtils from './AuthUtils';
import { setAuthencated } from './../actions/userActions';

export const _get = (url) => ({
    method: 'get',
    url
});

export const _post = (url, data) => ({
    method: 'post',
    url,
    data,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

export const _put = (url, data) => ({
    method: 'delete',
    url,
    data
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

    dispatch(enqueueSnackbar({
        message: `${error.response.status}: ${error.response.statusText}`,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
            autoHideDuration: 4000,
            action: key =>
                <IconButton onClick={() => dispatch(closeSnackbar(key))} size='small'>
                    <CloseIcon/>
                </IconButton>
        }
    }));
}