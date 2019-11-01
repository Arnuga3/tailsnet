import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from './../TAILSNET.png';

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
        marginBottom: theme.spacing(2)
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
        flexDirection: 'column'
    },
    divider: {
        borderLeft: '1px solid rgba(0,0,0,.3)',
        margin: `0 ${theme.spacing(2)}px`,
        marginTop: theme.spacing(1)
    },
    loginBtn: {
        margin: `${theme.spacing(1)}px 0`
    }
});

const Login = ({ classes }) => {
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.paper}>
                <div className={classes.logoWrapper}>
                    <img className={classes.logoImg} src={logo} alt=''/>
                    <Typography variant='h5' align='center'>
                        TailsNet
                    </Typography>
                </div>
                <div className={classes.rowWrapper}>
                    <div className={classes.columnWrapper}>
                        <TextField variant='outlined' label='username' margin='dense'>
                            username
                        </TextField>
                        <TextField variant='outlined' label='password' margin='dense'>
                            password
                        </TextField>
                        <Button className={classes.loginBtn} variant='contained' color='primary'>
                            Login
                        </Button>
                        <Typography variant='caption'>
                            Not Registered? <Link to=''>Register with email</Link>
                        </Typography>
                    </div>
                    <div className={classes.divider}></div>
                    <div className={classes.columnWrapper}>
                        <Button className={classes.loginBtn} href='/auth/facebook' variant='contained'>
                            Continue with Facebook
                        </Button>
                        <Button className={classes.loginBtn} href='/auth/google' variant='contained'>
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
};

export default withStyles(styles)(Login);