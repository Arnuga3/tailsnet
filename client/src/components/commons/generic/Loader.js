import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { cls } from './../../../utils/CommonUtil';

const Loader = ({ classes }) => {
    return (
        <div className={classes.spinner}>
            <div className={cls([classes.spinnerItem, classes.bounce1])}></div>
            <div className={cls([classes.spinnerItem, classes.bounce2])}></div>
            <div className={cls([classes.spinnerItem])}></div>
        </div>
    );
}

const styles = theme => ({
    spinner: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerItem: {
        width: 6,
        height: 24,
        borderTopRightRadius: '95%',
        borderBottomLeftRadius: '95%',
        backgroundColor: theme.palette.primary.main,
        display: 'inline-block',
        animation: '$sk-bouncedelay 1.4s infinite ease-in-out both'
    },
    bounce1: {
        animationDelay: '-0.32s'
    },
    bounce2: {
        animationDelay: '-0.18s'
    },
    '@keyframes sk-bouncedelay': {
        '0%, 80%, 100%': { transform: 'scale(0)' },
        '40%': { transform: 'scale(1)' }
    }
});

export default withStyles(styles, { withTheme: true })(Loader);