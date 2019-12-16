import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { getThemeConfig } from './theme';
import { 
    getAxiosClient, 
    getReduxAxiosMiddlewareConfig 
} from './utils/AxiosMiddleware';
import Index from './components/Index';
import rootReducer from './reducers/rootReducer';

const themeConfig = getThemeConfig();
const axiosClient = getAxiosClient();
const axiosMiddlewareConfig = getReduxAxiosMiddlewareConfig();

const store = createStore(
    rootReducer,
    applyMiddleware(
        logger,
        thunk,
        axiosMiddleware(axiosClient, axiosMiddlewareConfig)
    )
);

const App = () => {
    return (
        <ThemeProvider theme={themeConfig}>
            <Provider store={store}>
                <SnackbarProvider
                    dense
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Router>
                        <Index/>
                    </Router>
                </SnackbarProvider>
            </Provider>
        </ThemeProvider>
    );
};

export default App;
