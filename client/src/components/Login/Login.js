import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Link } from '@material-ui/core';
import SocialLoginBtn from './SocialLoginBtn';

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

const google_client_id = '161384501365-cj2sqlkttm82s1j45nvfr305baocb3sn.apps.googleusercontent.com';

const Login = ({ classes }) => {

    const handleSocialLogin = (user) => {
        console.log(user)
    };

    const handleSocialLoginFailure = (err) => {
        console.error(err)
    };

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
                <SocialLoginBtn
                    provider='google'
                    appId={google_client_id}
                    onLoginSuccess={handleSocialLogin}
                    onLoginFailure={handleSocialLoginFailure}
                    >
                    Sign in with Google
                </SocialLoginBtn>
                <Link href='/auth/facebook'>Facebook login</Link>
            </Paper>
        </div>
    );
};

export default withStyles(styles)(Login);