import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Paper, Grid, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import { createAndStorePetAccount } from '../../actions/petActions';
import PageWrapper from '../commons/generic/PageWrapper';
import PTextField from './../commons/generic/PTextField';
import BirthDatePicker from './../commons/BirthDatePicker';
import ProfAvatarEditor from './../commons/avatar/ProfAvatarEditor';
import PetType from './PetType';

const PetCreate = ({ dispatch, classes }) => {
    const [petType, setPetType] = useState(null);
    const [dob, setDob] = useState(null);
    const [errors, setErrors] = useState([]);

    let petNameRef = React.createRef();

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Create', 'Add Profile Image'];
    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    // TODO - go to previous component
    const handleCancel = () => {};

    const handleDOBChange = (dob, date) => setDob(date);
    const handleTypeChange = type => setPetType(type);

    const handleCreate = () => {
        const isDataValid = validateForm();
        if (isDataValid) {
            dispatch(createAndStorePetAccount({
                petName: petNameRef.value,
                dob,
                petType: petType.type
            }));
            clearForm();
            handleNext();
        } else console.error('Not all data provided');
    };

    const clearForm = () => {
        petNameRef.value = '';
        setPetType(null);
        setDob(null);
    }

    const validateForm = () => {
        let freshErrors = [];
        setErrors([]);

        if (petType === null)
            freshErrors.push({ name: 'petType' });

        if (petNameRef.value.trim() === '')
            freshErrors.push({ name: petNameRef.name });

        if (dob === null)
            freshErrors.push({ name: 'dob' });

        setErrors(freshErrors);
        return freshErrors.length === 0;
    };

    const hasError = field =>  {
        const fieldErrorArr = errors.filter(err => err.name === field);
        return fieldErrorArr.length > 0;
    };

    const getDetailsForm = () => {
        return (
            <React.Fragment>
                <PetType onTypeChange={handleTypeChange} errors={hasError('petType')}/>
                <PTextField inputRef={el => petNameRef = el}
                    label='Pet Name'
                    name='petName'
                    error={hasError('petName')}
                >
                    Pet Name
                </PTextField>
                <BirthDatePicker
                    value={dob}
                    onFormItemChange={handleDOBChange} 
                    errors={hasError('dob')}
                />
            </React.Fragment>
        );
    };

    const getAvatarEditor = () => {
        return (
            <ProfAvatarEditor dispatch={dispatch}/>
        );
    };

    const getStepContent = step => {
        switch (step) {
            case 0:
                return getDetailsForm();
            case 1:
                return getAvatarEditor();
            default:
                return 'Unknown step';
        }
    };

    return (
        <PageWrapper pageTitle='Pets'>
            <Paper className={classes.paper}>
                <Stepper activeStep={activeStep}>
                    {
                        steps.map(label =>
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        )
                    }
                </Stepper>
                <div className={classes.wrapper}>
                    {
                        <React.Fragment>
                            <Grid container justify='center'>
                                <Grid item xs={12} md={6}>
                                    {getStepContent(activeStep)}
                                </Grid>
                            </Grid>
                            <div className={classes.buttonsWrapper}>
                                {
                                    activeStep === 0 &&
                                    <React.Fragment>
                                        <Button component={Link}
                                            to='/user/pets'
                                            className={classes.button}
                                        >
                                            Cancel
                                        </Button>
                                        <Button variant='contained'
                                            color='primary'
                                            onClick={handleCreate}
                                            className={classes.button}
                                        >
                                            Create
                                        </Button>
                                    </React.Fragment>
                                }
                            </div>
                        </React.Fragment>
                    }
                </div>
            </Paper>
        </PageWrapper> 
    )
}

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(3)
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttonsWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        margin: theme.spacing(1)
    }
});

const mapStateToProps = ({ userStore, petStore }) => ({
    userStore,
    petStore
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(PetCreate));