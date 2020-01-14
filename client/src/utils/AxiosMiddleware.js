import axios from 'axios';
import Constants from './Constants';
import { handleSuccessfulAuthRequest, handleFailedRequest } from './ApiUtils';
import AuthUtils from './AuthUtils';

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
                    const token = AuthUtils.getToken();
                    const tntoken = token ? `Bearer ${token.replace('Bearer ', '')}` : '';
                    return {
                        ...req,
                        headers: {
                            ...req.headers,
                            xsrfCookieName: 'XSRF-TOKEN',
                            xsrfHeaderName: 'X-XSRF-TOKEN',
                            tntoken
                        }
                    };
                }
            }],
            response: [{
                success: function ({ dispatch }, response) {
                    const token = response.headers[Constants.TOKEN];
                    if (token)
                        handleSuccessfulAuthRequest(dispatch, token)
                    return response;
                },
                error: function ({ dispatch }, error) {
                    handleFailedRequest(dispatch, error)
                    return Promise.reject(error);
                }
            }]
        }
    }
}