import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Paper, Grid, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import PageWrapper from '../../commons/generic/PageWrapper';
import PTextField from '../../commons/generic/PTextField';
import BirthDatePicker from '../../commons/BirthDatePicker';
import AdvancedAvatarEditor from '../../commons/avatar/avatarEditor/AdvancedAvatarEditor';
import PetCreatePreview from './PetCreatePreview';
import PetType from './PetType';
import {
    createAndStorePetDetails,
    createAndStorePetDetailsAndImage
} from '../../../actions/petActions';
import { useHistory } from "react-router-dom";

const PetCreate = ({ dispatch, classes }) => {
    const [petType, setPetType] = useState(null);
    const [petName, setPetName] = useState('');
    const [dob, setDob] = useState(null);
    const [errors, setErrors] = useState([]);
    const [editAvatar, setEditAvatar] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [petPreviewImage, setPetPreviewImage] = useState(null);
    const [petImageState, setPetImageState] = useState({});
    const [skipped, setSkipped] = useState(false);

    const history = useHistory();

    const [activeStep, setActiveStep] = useState(0);
    const steps = ['Details', 'Profile Image'];

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        setSkipped(false);
    };
    const handleNext = () => {
        const areDetailsValid = validateForm();
        if (areDetailsValid) {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        } else console.error('Not all data provided');
    };

    const handleDOBChange = (dob, date) => setDob(date);
    const handleTypeChange = type => setPetType(type);

    const handleCreate = () => {
        const petDetails = {
            petName,
            dob,
            petType: petType.type
        };

        if (skipped) {
            dispatch(createAndStorePetDetails(petDetails, history));
        
        } else if (petImageState.blob) {
            var formData = new FormData();
            formData.append('avatarImage', petImageState.blob);
            dispatch(createAndStorePetDetailsAndImage(petDetails, formData, history));
        }
    };

    const handleSkip = () => {
        setSkipped(true);
        handleNext();
    };

    const handleAvatarEdit = () =>
        setEditAvatar(!editAvatar);

    const validateForm = () => {
        let freshErrors = [];
        setErrors([]);

        if (petType === null)
            freshErrors.push({ name: 'petType' });

        if (petName.trim().length < 2)
            freshErrors.push({ error: 'minimum 2 characters', name: 'petName' });

        if (dob === null)
            freshErrors.push({ name: 'dob' });

        setErrors(freshErrors);
        return freshErrors.length === 0;
    };

    const formError = field =>
        errors.filter(err => err.name === field);

    const hasError = field =>  {
        const fieldErrorArr = formError(field);
        return fieldErrorArr.length > 0;
    };

    const getDetailsForm = () => {
        return (
            <React.Fragment>
                <PetType value={petType}
                    onTypeChange={handleTypeChange}
                    errors={hasError('petType')}
                />
                <PTextField
                    onChange={({ target }) => setPetName(target.value)}
                    value={petName}
                    label={
                        hasError('petName') && formError('petName')[0].error
                            ? `Name - ${formError('petName')[0].error}`
                            : 'Name'
                    }
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
            <AdvancedAvatarEditor
                image={selectedImage}
                onImageSelected={image => {
                    setSelectedImage(image);
                    setPetImageState({});
                }}
                onChange={imgState => {
                    createPreviewImage(imgState.blob);
                    setPetImageState(imgState);
                }}
                imageState={petImageState}
                onEditCancel={handleAvatarEdit}
                actionButtons={false}
                dispatch={dispatch}
            />
        );
    };

    const getPreview = () => {
        return (
            <PetCreatePreview
                details={{
                    type: petType.type,
                    name: petName,
                    dob
                }}
                avatar={!skipped ? petPreviewImage : null}
                size='large'
            />
        );
    };

    const createPreviewImage = blob => {
        if (blob) {
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = e => setPetPreviewImage(e.target.result);
        }
    }

    const getStepContent = step => {
        switch (step) {
            case 0:
                return getDetailsForm();
            case 1:
                return getAvatarEditor();
            case 2:
                return getPreview();
            default:
                return 'Unknown step';
        }
    };

    return (
        <PageWrapper pageTitle='New Pet'>
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
                                <Button
                                    onClick={handleBack}
                                    className={classes.button}
                                    disabled={activeStep === 0}
                                >
                                    Back
                                </Button>
                                {
                                    activeStep === 0 &&
                                        <Button variant='contained'
                                            color='primary'
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            Next
                                        </Button>
                                }
                                {
                                    activeStep === 1 &&
                                        <React.Fragment>
                                            <Button
                                                onClick={handleSkip}
                                                className={classes.button}
                                            >
                                                Skip
                                            </Button>
                                            <Button variant='contained'
                                                color='primary'
                                                onClick={handleNext}
                                                className={classes.button}
                                                disabled={!selectedImage}
                                            >
                                                Next
                                            </Button>
                                        </React.Fragment>
                                }
                                {
                                    activeStep === steps.length &&
                                        <Button variant='contained'
                                            color='primary'
                                            className={classes.button}
                                            onClick={handleCreate}
                                        >
                                            Create
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