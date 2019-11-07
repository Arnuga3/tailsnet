import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Grid } from '@material-ui/core';
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
                <Grid item xs={12} className={classes.logoWrapper}>
                    <img className={classes.logoImg} src={logo} alt=''/>
                    <Typography variant='h5' align='center'>
                        TailsNet
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <form className={classes.columnWrapper} onSubmit={handleSubmit}>
                            <TextField inputRef={el => emailRef = el} variant='outlined' label='Email' margin='dense'>
                                Email
                            </TextField>
                            <TextField inputRef={el => passwordRef = el} variant='outlined' label='Password' margin='dense'>
                                Password
                            </TextField>
                            <Button type='submit' className={classes.loginBtn} variant='contained' color='primary'>
                                Login
                            </Button>
                            <Typography variant='caption'>
                                Not Registered? <Link to='/register'>Register with email</Link>
                            </Typography>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div className={classes.columnWrapper}>
                            <Button className={classes.loginBtn} href='/auth/facebook' variant='contained'>
                                Sign In with Facebook
                            </Button>
                            <Button className={classes.loginBtn} href='/auth/google' variant='contained'>
                                Sign In with Google
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
        margin: `${theme.spacing(1)}px 0`
    }
});

export default withStyles(styles)(Login);