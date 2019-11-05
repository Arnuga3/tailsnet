import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from 'axios';
import logo from './../TAILSNET.png';

const Register = ({ classes }) => {

    let emailRef = React.createRef();
    let passwordRef = React.createRef();

    const [selectedDate, handleDateChange] = useState(null);
    const [userTitle, setUserTitle] = React.useState(0);

    const handleTitleChange = event => {
        console.log(event.target.value);
        setUserTitle(event.target.value);
    };

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
                        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
                            <InputLabel id="userTitle">Title</InputLabel>
                            <Select
                                labelWidth={35}
                                value={userTitle}
                                onChange={handleTitleChange}
                            >
                                <MenuItem value={0}>&nbsp;</MenuItem>
                                <MenuItem value={1}>Mr</MenuItem>
                                <MenuItem value={2}>Mrs</MenuItem>
                                <MenuItem value={3}>Ms</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField inputRef={el => emailRef = el} variant='outlined' label='Name' margin='dense'>
                            Name
                        </TextField>
                        <TextField inputRef={el => emailRef = el} variant='outlined' label='Surname' margin='dense'>
                            Surname
                        </TextField>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disableFuture
                                inputVariant='outlined'
                                margin='dense'
                                openTo='year'
                                format='dd/MM/yyyy'
                                label='Date of birth'
                                views={['year', 'month', 'date']}
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </form>
                    <div className={classes.divider}></div>
                    <div className={classes.columnWrapper}>
                        <TextField inputRef={el => emailRef = el} variant='outlined' label='Email' margin='dense'>
                            Email
                        </TextField>
                        <TextField inputRef={el => emailRef = el} variant='outlined' label='Repeat email' margin='dense'>
                            Repeat Email
                        </TextField>
                        <TextField inputRef={el => passwordRef = el} variant='outlined' label='Password' margin='dense'>
                            Password
                        </TextField>
                        <TextField inputRef={el => passwordRef = el} variant='outlined' label='Repeat Password' margin='dense'>
                            Repeat Password
                        </TextField>
                    </div>
                </div>
                <Button type='submit' className={classes.registerBtn} variant='contained' color='primary'>
                    Register
                </Button>
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
    registerBtn: {
        margin: `${theme.spacing(3)}px 0 0 0`
    }
});

export default withStyles(styles)(Register);