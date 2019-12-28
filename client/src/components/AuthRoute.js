import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({ component: Component, auth, ...restProp }) => {
    return (
        <Route {...restProp} render={props =>
            auth
            ? <Component {...props}/>
            : <Redirect to='/login' push/>
        }/>
    );
};

const mapStateToProps = ({ userStore }) => ({
    auth: userStore.authenticated
});

export default connect(mapStateToProps)(AuthRoute);