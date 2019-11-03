import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import logo from './../TAILSNET.png';
import axios from 'axios';

const Login = ({ classes }) => {

    let emailRef = React.createRef();
    let passwordRef = React.createRef();

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/auth/local', {
            email: emailRef.value,
            password: passwordRef.value
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

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
                    <form className={classes.columnWrapper} onSubmit={handleSubmit}>
                        <TextField inputRef={el => emailRef = el} variant='outlined' label='email' margin='dense'>
                            email
                        </TextField>
                        <TextField inputRef={el => passwordRef = el} variant='outlined' label='password' margin='dense'>
                            password
                        </TextField>
                        <Button type='submit' className={classes.loginBtn} variant='contained' color='primary'>
                            Login
                        </Button>
                        <Typography variant='caption'>
                            Not Registered? <Link to='/register'>Register with email</Link>
                        </Typography>
                    </form>
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

export default withStyles(styles)(Login);