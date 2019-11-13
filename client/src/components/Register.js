import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Fab, Typography, MenuItem, Grid } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Validation from './../utils/Validation';
import Configuration from './../utils/Configuration';
import axios from 'axios';

const Register = ({ classes }) => {

    let nameRef = React.createRef();
    let surnameRef = React.createRef();
    let emailRef = React.createRef();
    let emailRepeatRef = React.createRef();
    let passwordRef = React.createRef();
    let passwordRepeatRef = React.createRef();

    const [title, setTitle] = React.useState(0);
    const [DOB, handleDOBChange] = useState(null);
    const [errors, setErrors] = useState([]);
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleTitleChange = event =>
        setTitle(event.target.value);

    const handlePasswordInput = event => {
        const password = event.target.value;
        setPasswordStrength(Validation.analysePassword(password));
        if (password === '')
            setPasswordStrength('');
    };

    const validateForm = () => {
        let freshErrors = [];

        if (title === 0)
            freshErrors.push({ name: 'title' });

        if (nameRef.value.trim() === '')
            freshErrors.push({ name: nameRef.name });

        if (surnameRef.value.trim() === '')
            freshErrors.push({ name: surnameRef.name });

        if (DOB === null)
            freshErrors.push({ name: 'DOB' });

        if (emailRef.value.trim() === '')
            freshErrors.push({ name: emailRef.name });

        else if (!Validation.validEmail(emailRef.value))
            freshErrors.push({ error: Configuration.NOT_VALID, name: emailRef.name });

        if (emailRepeatRef.value.trim() === '')
            freshErrors.push({ name: emailRepeatRef.name });

        else if (emailRef.value.trim() !== emailRepeatRef.value.trim())
            freshErrors.push({ error: Configuration.NOT_MATCHING, name: emailRepeatRef.name });

        if (passwordRef.value.trim() === '')
            freshErrors.push({ name: passwordRef.name });

        if (passwordRepeatRef.value.trim() === '')
            freshErrors.push({ name: passwordRepeatRef.name });

        if (passwordRef.value.trim() !== passwordRepeatRef.value.trim())
            freshErrors.push({ error: Configuration.NOT_MATCHING, name: passwordRepeatRef.name });

        setErrors(freshErrors);
        return freshErrors.length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isDataValid = validateForm();

        if (isDataValid)
            axios.post('/auth/local/register', {
                title,
                name: nameRef.value,
                surname: surnameRef.value,
                DOB,
                email: emailRef.value,
                password: passwordRef.value
            })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    };

    const formError = field =>
        errors.filter(err => err.name === field);
    
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Fab href='/' size='small'>
                            <ArrowBack color='action'/>
                        </Fab>
                        <Grid item xs={12} className={classes.logoWrapper}>
                            <img className={classes.logoImg} src='/TAILSNET.png' alt=''/>
                            <Typography variant='h5' align='center'>TailsNet</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.columnWrapper}>
                                <TextField variant='outlined' margin='dense'
                                    select
                                    label='Title'
                                    name='title'
                                    value={title}
                                    onChange={handleTitleChange}
                                    error={formError('title').length > 0} 
                                >
                                    <MenuItem value={0}>&nbsp;</MenuItem>
                                    <MenuItem value={'Mr'}>Mr</MenuItem>
                                    <MenuItem value={'Mrs'}>Mrs</MenuItem>
                                    <MenuItem value={'Ms'}>Ms</MenuItem>
                                </TextField>
                                <TextField variant='outlined' margin='dense'
                                    name='name'
                                    label='Name'
                                    inputRef={el => nameRef = el}
                                    error={formError('name').length > 0}
                                >Name
                                </TextField>
                                <TextField variant='outlined' margin='dense'
                                    name='surname'
                                    label='Surname'
                                    inputRef={el => surnameRef = el}
                                    error={formError('surname').length > 0}
                                >Surname
                                </TextField>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker inputVariant='outlined' margin='dense'
                                        name='DOB'
                                        label='Date of birth'
                                        disableFuture
                                        openTo='year'
                                        format='dd/MM/yyyy'
                                        views={['year', 'month', 'date']}
                                        value={DOB}
                                        onChange={handleDOBChange}
                                        error={formError('DOB').length > 0}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.columnWrapper}>
                                <TextField variant='outlined' margin='dense'
                                    name='email'
                                    label={
                                        formError('email').length > 0 && formError('email')[0].error
                                            ? `Email - ${formError('email')[0].error}`
                                            : 'Email'
                                    }
                                    inputRef={el => emailRef = el}
                                    error={formError('email').length > 0}
                                >Email
                                </TextField>
                                <TextField variant='outlined' margin='dense'
                                    name='emailRepeat'
                                    label={
                                        formError('emailRepeat').length > 0 && formError('emailRepeat')[0].error
                                            ? `Repeat email - ${formError('emailRepeat')[0].error}`
                                            : 'Repeat email'
                                    }
                                    inputRef={el => emailRepeatRef = el}
                                    error={formError('emailRepeat').length > 0}
                                >Repeat Email
                                </TextField>
                                <TextField variant='outlined' margin='dense'
                                    name='password'
                                    type='password'
                                    label={
                                        passwordStrength !== ''
                                            ? `Password - ${passwordStrength}`
                                            : 'Passowrd'
                                    }
                                    inputRef={el => passwordRef = el}
                                    onChange={handlePasswordInput}
                                    error={formError('password').length > 0}
                                >Password
                                </TextField>
                                <TextField variant='outlined' margin='dense'
                                    name='passwordRepeat'
                                    type='password'
                                    label={
                                        formError('passwordRepeat').length > 0 && formError('passwordRepeat')[0].error
                                            ? `Repeat password - ${formError('passwordRepeat')[0].error}`
                                            : 'Repeat password'
                                    }
                                    inputRef={el => passwordRepeatRef = el}
                                    error={formError('passwordRepeat').length > 0}
                                >Repeat Password
                                </TextField>
                            </div>
                        </Grid>
                        <Button variant='contained' fullWidth color='primary' className={classes.button}
                            type='submit'
                        >Register
                        </Button>
                    </Grid>
                </form>
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
    button: {
        margin: `${theme.spacing(1)}px 0`
    }
});

export default withStyles(styles)(Register);