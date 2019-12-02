import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkToken } from './../actions/authActions';

const ApplicationRedirect = ({ token, dispatch }) => {

    useEffect(() => {
        dispatch(checkToken());
    });

    return (
        !token && <Redirect to='/login' push />
    );
}

const mapStateToProps = ({ authStore }) => ({
    token: authStore.token
});

export default connect(mapStateToProps)(ApplicationRedirect);