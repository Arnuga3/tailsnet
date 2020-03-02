import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const PageWrapper = ({ classes, children, pageTitle='' }) => {
    return (
        <div className={classes.root}>
            <Grid container justify='center'>
                <Grid item xs={12} md={9}>
                    <Typography variant='h5' gutterBottom>{pageTitle}</Typography>
                </Grid>
                <Grid item xs={12} md={9}>
                    {children} 
                </Grid>
            </Grid>
        </div>
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

export default withStyles(styles, { withTheme: true })(PageWrapper);