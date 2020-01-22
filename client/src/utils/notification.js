import React from 'react';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { enqueueSnackbar, closeSnackbar } from './../actions/notificationActions';

export function sendNotification({ dispatch, type, msg }) {
    const duration = type === 'error' ? 4000 : 2000;
    const message = msg ? msg : type === 'error' ? 'Error' : 'Success';
    dispatch(enqueueSnackbar({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: type,
            autoHideDuration: duration,
            action: key =>
                <IconButton onClick={() => dispatch(closeSnackbar(key))} size='small'>
                    <CloseIcon/>
                </IconButton>
        }
    }));
};