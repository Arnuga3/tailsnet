import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Stepper, Step, StepLabel, Button, Typography } from '@material-ui/core';
import { createAndStorePetAccount } from '../../actions/petActions';
import PageWrapper from '../commons/generic/PageWrapper';
import PTextField from './../commons/generic/PTextField';
import BirthDatePicker from './../commons/BirthDatePicker';
import ProfAvatarEditor from './../commons/avatar/ProfAvatarEditor';

const PetCreate = ({ dispatch, classes }) => {
    const [petType, setPetType] = useState(null);
    const [dob, setDob] = useState(null);
    const [errors, setErrors] = useState([]);

    let petNameRef = React.createRef();

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Details', 'Profile Image'];
    const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);
    const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

    const handleDOBChange = (dob, date) => setDob(date);
    const handleTypeChange = type => setPetType(type);

    const handleCreate = () => {
        const isDataValid = this.validateForm();
        if (isDataValid) {
            dispatch(createAndStorePetAccount({
                petName: this.petNameRef.value,
                dob,
                petType: petType.type
            }));
            clearForm();
        } else console.error('Not all data provided');
    };

    const clearForm = () => {
        petNameRef.value = '';
        setDob(null);
    }

    const validateForm = () => {
        let freshErrors = [];
        setErrors([]);

        if (petType === null)
            freshErrors.push({ name: 'petType' });

        if (petNameRef.value.trim() === '')
            freshErrors.push({ name: petNameRef.name });

        setErrors(freshErrors);
        return freshErrors.length === 0;
    };

    const formError = field => errors
        .filter(err => err.name === field);

    const getDetailsForm = () => {
        return (
            // TODO - Add type here
            <React.Fragment>
                <PTextField
                    label='Pet Name'
                    name='petName'
                    inputRef={el => petNameRef = el}
                    error={formError('petName').length > 0}
                >
                    Pet Name
                </PTextField>
                <BirthDatePicker value={dob} onFormItemChange={handleDOBChange}/>
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
                        activeStep === steps.length
                        ?
                            <div>
                                <Typography className={classes.instructions}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Button onClick={handleReset} className={classes.button}>
                                    Reset
                                </Button>
                            </div>
                        :
                            <React.Fragment>
                                <Grid container justify='center'>
                                    <Grid item xs={12} md={6}>
                                        {getStepContent(activeStep)}
                                    </Grid>
                                </Grid>
                                <div className={classes.buttonsWrapper}>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    {
                                        activeStep === 0 &&
                                        <Button
                                            variant='contained'
                                            color='primary'
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            Save Details
                                        </Button>
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