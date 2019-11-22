import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography, MenuItem, Grid } from '@material-ui/core';
import PTextField from './commons/generic/PTextField';
import PButton from './commons/generic/PButton';
import BirthDatePicker from './commons/BirthDatePicker';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Validation from './../utils/Validation';
import Configuration from './../utils/Configuration';
import { registerAndStoreUserAccount } from '../actions/userActions';

const Register = ({ classes, dispatch }) => {

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
            dispatch(
                registerAndStoreUserAccount({
                    title,
                    name: nameRef.value,
                    surname: surnameRef.value,
                    DOB,
                    email: emailRef.value,
                    password: passwordRef.value
                })
            );
    };

    const formError = field =>
        errors.filter(err => err.name === field);
    
    return (
        <div className={classes.wrapper}>
            <Paper className={classes.paper}>
                <form onSubmit={handleSubmit}>
                    <Grid container>
                        <Grid item xs={2} className={classes.columnWrapper}>
                            <Typography variant='caption' align='center'>
                                Have an account?
                            </Typography>
                            <Button className={classes.goToLoginBtn} to='/login' variant='outlined' component={Link} size='small'>
                                <ArrowBack color='action'/> &nbsp; Go to Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} className={classes.logoWrapper}>
                            <img className={classes.logoImg} src='/TAILSNET.png' alt=''/>
                            <Typography variant='h5' align='center'>TailsNet</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.columnWrapper}>
                                <PTextField select
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
                                </PTextField>
                                <PTextField label='Name' name='name' inputRef={el => nameRef = el} error={formError('name').length > 0}>
                                    Name
                                </PTextField>
                                <PTextField label='Surname' name='surname' inputRef={el => surnameRef = el} error={formError('surname').length > 0}>
                                    Surname
                                </PTextField>
                                <BirthDatePicker value={DOB}
                                    onChange={handleDOBChange}
                                    error={formError('DOB').length > 0}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.columnWrapper}>
                                <PTextField name='email' inputRef={el => emailRef = el}
                                    label={
                                        formError('email').length > 0 && formError('email')[0].error
                                            ? `Email - ${formError('email')[0].error}`
                                            : 'Email'
                                    }
                                    error={formError('email').length > 0}
                                >
                                    Email
                                </PTextField>
                                <PTextField name='emailRepeat' inputRef={el => emailRepeatRef = el}
                                    label={
                                        formError('emailRepeat').length > 0 && formError('emailRepeat')[0].error
                                            ? `Repeat email - ${formError('emailRepeat')[0].error}`
                                            : 'Repeat email'
                                    }
                                    error={formError('emailRepeat').length > 0}
                                >
                                    Repeat Email
                                </PTextField>
                                <PTextField name='password' type='password' inputRef={el => passwordRef = el} onChange={handlePasswordInput}
                                    label={
                                        passwordStrength !== ''
                                            ? `Password - ${passwordStrength}`
                                            : 'Passowrd'
                                    }
                                    error={formError('password').length > 0}
                                >
                                    Password
                                </PTextField>
                                <PTextField name='passwordRepeat' type='password' inputRef={el => passwordRepeatRef = el}
                                    label={
                                        formError('passwordRepeat').length > 0 && formError('passwordRepeat')[0].error
                                            ? `Repeat password - ${formError('passwordRepeat')[0].error}`
                                            : 'Repeat password'
                                    }
                                    error={formError('passwordRepeat').length > 0}
                                >
                                    Repeat Password
                                </PTextField>
                            </div>
                        </Grid>
                        <Grid container justify='center'>
                            <PButton type='submit'>
                                Register
                            </PButton>
                        </Grid>
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
        alignItems: 'center'
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
    goToLoginBtn: {
        textTransform: 'none',
        margin: `${theme.spacing(.5)}px 0 0 0`
    },
    button: {
        textTransform: 'none',
        margin: `${theme.spacing(1)}px 0`
    }
});

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps)(withStyles(styles)(Register));