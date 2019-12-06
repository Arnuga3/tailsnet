import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from './reducers/rootReducer';
import './index.css';
import App from './App';
import Constants from './utils/Constants';
import * as serviceWorker from './serviceWorker';

import { saveToken, removeToken } from './actions/authActions';
// TODO Move this to a separate util
const axiosClient = axios.create({
    responseType: 'json'
});

const axiosMiddlewareConfig = {
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
                    dispatch(removeToken());
                return Promise.reject(error);
            }
        }]
    }
};

const store = createStore(
    rootReducer,
    applyMiddleware(
        logger,
        thunk,
        axiosMiddleware(axiosClient, axiosMiddlewareConfig)
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
