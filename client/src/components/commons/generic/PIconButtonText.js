import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Typography } from '@material-ui/core';

const PIconButtonText = ({ classes, icon, children, handleClick, disabled=false }) => {
    return (
        <div className={classes.wrapper}>
            <IconButton
                color='primary'
                onClick={handleClick}
                disabled={disabled}
            >
                {icon}
            </IconButton>
            <Typography
                color='textSecondary'
                variant='caption'
                display='block'
                align='center'
            >
                {children}
            </Typography>
        </div>
    );
}

const styles = theme => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        margin: `0 ${theme.spacing(1)}px`
    }
});

export default withStyles(styles, { withTheme: true })(PIconButtonText);