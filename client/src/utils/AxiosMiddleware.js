import React from 'react';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import Constants from './Constants';
import { saveToken, logout } from './../actions/authActions';
import { enqueueSnackbar, closeSnackbar } from './../actions/notificationActions';
import CloseIcon from '@material-ui/icons/Close';

export const getAxiosClient = () => {
    return axios.create({
        responseType: 'json'
    });
}

export const getReduxAxiosMiddlewareConfig = () => {
    return {
        interceptors: {
            request: [{
                success: function ({}, req) {
                    const token = localStorage.getItem(Constants.TOKEN);
                    req.headers = {
                        tntoken: `Bearer ${token}`,
                        xsrfCookieName: 'XSRF-TOKEN',
                        xsrfHeaderName: 'X-XSRF-TOKEN'
                    }
                    return req;
                }
            }],
            response: [{
                success: function ({ dispatch }, response) {
                    const token = response.headers[Constants.TOKEN];
                    if (token)
                        dispatch(saveToken(token));
                    return response;
                },
                error: function ({ dispatch }, error) {
                    if (error.response.status === 401)
                        dispatch(logout());

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
                        })
                    );

                    return Promise.reject(error);
                }
            }]
        }
    }
}