import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { retrieveAndStoreUserAccount } from './../actions/userActions';

/*
    AuthRoute component proptects anauthorised users to access protected components
    Is a wrapper for Route component

    auth states (null, false, true) are used to handle browser refresh events
*/
const AuthRoute = ({ dispatch, component: Component, auth, ...restProp }) => {

    useEffect(() => {
        if (auth === null)  // Make auth request
            dispatch(retrieveAndStoreUserAccount())
    }, [auth]);     // Prevent from sending many requests, useEffect won't be called if auth value isn't changed

    return (
        <Route {...restProp} render={props => 
            auth === true ?
            <Component {...props}/> :     // User has been recently authenticated, render component

                auth === false ?
                <Redirect to='/login' push/> :    // User failed authentication, navigate to login page
                null    // User is not authenticated, but valid token may exist. Make authentication request and wait for (true/false) request
        }/>
    );
};

const mapStateToProps = ({ userStore }) => ({
    auth: userStore.authenticated
});

export default connect(mapStateToProps)(AuthRoute);