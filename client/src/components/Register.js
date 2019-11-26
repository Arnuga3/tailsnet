import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Button, Typography, Grid } from '@material-ui/core';
import PTextField from './commons/generic/PTextField';
import PButton from './commons/generic/PButton';
import BasicDetails from './user/BasicDetails';
import BirthDatePicker from './commons/BirthDatePicker';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Validation from './../utils/Validation';
import { registerAndStoreUserAccount } from '../actions/userActions';

const Register = ({ classes, dispatch }) => {

    let emailRef = React.createRef();
    let emailRepeatRef = React.createRef();
    let passwordRef = React.createRef();
    let passwordRepeatRef = React.createRef();

    const [user, setUser] = useState({
        title: 0,
        name: '',
        surname: '',
        dob: null
    });

    const [errors, setErrors] = useState([]);
    const [passwordStrength, setPasswordStrength] = useState('');

    const handleFormItemChange = (item, value) => {
        const aUser = { ...user, [item]: value };
        setUser(aUser);
    };

    const handlePasswordInput = e => {
        const password = e.target.value;
        setPasswordStrength(Validation.analysePasswordStrength(password));
        if (password === '')
            setPasswordStrength('');
    };

    const validateForm = () => {
        const { title, name, surname, dob } = user;
        let freshErrors = [];

        if (title === 0)
            freshErrors.push({ name: 'title' });

        if (name.trim() === '')
            freshErrors.push({ name: 'name' });

        if (surname.trim() === '')
            freshErrors.push({ name: 'surname' });

        if (dob === null)
            freshErrors.push({ name: 'dob' });

        const emailErrors = Validation.validateEmails(emailRef, emailRepeatRef);
        freshErrors = [ ...freshErrors, ...emailErrors ];

        const passwordErrors = Validation.validatePasswords(passwordRef, passwordRepeatRef);
        freshErrors = [ ...freshErrors, ...passwordErrors ];

        setErrors(freshErrors);
        return freshErrors.length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        const isDataValid = validateForm(user);

        if (isDataValid) {
            const { title, name, surname, dob } = user;
            dispatch(registerAndStoreUserAccount({
                title,
                name,
                surname,
                dob,
                email: emailRef.value,
                password: passwordRef.value
            }));
        }
        
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
                                <BasicDetails
                                    title={user.title}
                                    name={user.name}
                                    surname={user.surname}
                                    onFormItemChange={handleFormItemChange}
                                    errors={errors}
                                />
                                <BirthDatePicker value={user.dob}
                                    onFormItemChange={handleFormItemChange}
                                    errors={errors}
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