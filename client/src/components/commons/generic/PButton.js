import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const PButton = ({ classes, children, type }) => {
    return (
        <div className={classes.wrapper}>
            <Button
                className={classes.button}
                fullWidth
                type={type}
                variant='contained'
                color='primary'
                className={classes.button}
            >
                {children}
            </Button>
        </div>
    );
}

const styles = theme => ({
    wrapper: {
        maxWidth: 350
    },
    button: {
        marginTop: theme.spacing(3)
    }
});

export default withStyles(styles, { withTheme: true })(PButton);