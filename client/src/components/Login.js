import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button, Grid } from '@material-ui/core';
import PTextField from './commons/generic/PTextField';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { login } from '../api/api';

const Login = ({ classes, history }) => {

    let emailRef = React.createRef();
    let passwordRef = React.createRef();

    const handleSubmit = e => {
        e.preventDefault();

        login(emailRef.value, passwordRef.value)
            .then(res => {
                const token = res.headers.tntoken;
                if (token) {
                    localStorage.setItem('tntoken', token);
                    history.push('/');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.paper}>
                <Grid item xs={12} className={classes.logoWrapper}>
                    <img className={classes.logoImg} src='/TAILSNET.png' alt=''/>
                    <Typography variant='h5' align='center'>
                        TailsNet
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <form className={classes.columnWrapper} onSubmit={handleSubmit}>
                            <PTextField inputRef={el => emailRef = el} label='Email'>
                                Email
                            </PTextField>
                            <PTextField inputRef={el => passwordRef = el} label='Password'>
                                Password
                            </PTextField>
                            <Button type='submit' className={classes.loginBtn} variant='contained' color='primary'>
                                Login
                            </Button>
                            <Typography variant='caption' align='center'>
                                Do not have an account?
                            </Typography>
                            <Button to='/register' component={Link} size='small' variant='outlined' className={classes.registerBtn}>
                                Register with Email &nbsp;<ArrowForward color='action'/>
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.columnWrapper}>
                            <Button className={classes.socialBtn} href='/auth/facebook' variant='outlined'>
                                <svg width='18' height='18' viewBox='0 0 18 18'>
                                    <path d='M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.29c-1 0-1.19.48-1.19 1.18V8.4h2.39l-.31 2.42h-2.08V17h-2.5z' fill='#3b5998'></path>
                                </svg> &nbsp; Sign In with Facebook
                            </Button>
                            <Button className={classes.socialBtn} href='/auth/google' variant='outlined'>
                                <svg width='18' height='18' viewBox='0 0 18 18'>
                                    <path d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z' fill='#4285F4'></path>
                                    <path d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z' fill='#0F9D58'></path>
                                    <path d='M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z' fill='#F4B400'></path>
                                    <path d='M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z' fill='#DB4437'></path>
                                </svg> &nbsp; Sign In with Google
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

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
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
        color: 'rgba(0,0,0,.7)'
    },
    logoImg: {
        width: 45,
        marginRight: theme.spacing(1)
    },
    rowWrapper: {
        display: 'flex'
    },
    columnWrapper: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(1)
    },
    loginBtn: {
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(2.5)}px 0`
    },
    registerBtn: {
        textTransform: 'none',
        margin: `${theme.spacing(.5)}px 0 0 0`
    },
    socialBtn: {
        textTransform: 'none',
        margin: `${theme.spacing(1)}px 0 0 0`
    }
});

export default withStyles(styles)(Login);