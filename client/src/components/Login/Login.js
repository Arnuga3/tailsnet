import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Link } from '@material-ui/core';

const styles = theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(3)
    },
    loginBtn: {
        marginTop: theme.spacing(1)
    }
});

const Login = ({ classes }) => {
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.paper}>
                <Typography variant='h5' align='center'>
                    TailsNet
                </Typography>
                <TextField variant='outlined' label='username' margin='dense'>
                    username
                </TextField>
                <TextField variant='outlined' label='password' margin='dense'>
                    password
                </TextField>
                <Button className={classes.loginBtn} variant='contained' color='primary'>
                    Login
                </Button>
                <Link href='/auth/facebook'>Facebook login</Link>
                <Link href='/auth/google'>Google login</Link>
            </Paper>
        </div>
    );
};

export default withStyles(styles)(Login);