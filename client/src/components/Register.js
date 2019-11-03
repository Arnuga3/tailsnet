import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const Register = ({ classes }) => {

    let emailRef = React.createRef();
    let passwordRef = React.createRef();

    const handleSubmit = e => {
        e.preventDefault();

        axios.post('/auth/local/register', {
            email: emailRef.value,
            password: passwordRef.value
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    };

    return (
        <Paper>
            <form className={classes.columnWrapper} onSubmit={handleSubmit}>
                <TextField inputRef={el => emailRef = el} variant='outlined' label='email' margin='dense'>
                    email
                </TextField>
                <TextField inputRef={el => passwordRef = el} variant='outlined' label='password' margin='dense'>
                    password
                </TextField>
                <Button type='submit' className={classes.registerBtn} variant='contained' color='primary'>
                    Register
                </Button>
            </form>
        </Paper>
    );
};

const styles = theme => ({
    columnWrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    registerBtn: {
        margin: `${theme.spacing(1)}px 0`
    }
});

export default withStyles(styles)(Register);