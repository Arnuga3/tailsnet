import React from 'react';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar } from './../actions/notificationActions';

class Notifier extends React.Component {
    displayed = [];

    storeDisplayed = id => {
        this.displayed = [...this.displayed, id];
    };

    removeDisplayed = id => {
        this.displayed = this.displayed.filter(key => id !== key);
    };

    componentDidUpdate() {
        const { dispatch, enqueueSnackbar, closeSnackbar, notifications } = this.props;
        
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed)
                return closeSnackbar(key);
            
            if (this.displayed.includes(key))
                return;

            enqueueSnackbar(message, { key, ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose)
                        options.onClose(event, reason, key);
                },
                onExited: (event, key) => {
                    dispatch(removeSnackbar(key));
                    this.removeDisplayed(key);
                }
            });
            this.storeDisplayed(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = ({ notificationStore }) => ({
    notifications: notificationStore.notifications
});

export default withSnackbar(connect(mapStateToProps)(Notifier));