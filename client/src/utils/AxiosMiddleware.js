import axios from 'axios';
import Constants from './Constants';
import { saveToken, logout } from '../actions/authActions';

export const client = () => {
    return axios.create({
        responseType: 'json'
    });
}

export const config = () => {
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
                    return Promise.reject(error);
                }
            }]
        }
    }
}