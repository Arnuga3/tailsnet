import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import PTextField from './commons/generic/PTextField';
import PButton from './commons/generic/PButton';
import ProfileImage from './commons/ProfileImage';
import BirthDatePicker from './commons/BirthDatePicker';
import PetType from './commons/PetType';
import { retrievePetAccounts, postPetAccount } from './../actions/petActions';
import PageWrapper from './commons/generic/PageWrapper';

const CreatePetProfile = ({ classes, dispatch, petAccounts }) => {

    const [petType, setPetType] = useState('Cat');
    let petNameRef = React.createRef();
    const [dob, handleDOBChange] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleCreate = () => {
        const isDataValid = validateForm();
        if (isDataValid) {
            dispatch(postPetAccount({
                petName: petNameRef.value,
                dob,
                petType
            }));
        } else console.error('Not all data provided');
    };

    const validateForm = () => {
        let freshErrors = [];

        if (petType === null)
            freshErrors.push({ name: 'petType' });

        if (petNameRef.value.trim() === '')
            freshErrors.push({ name: petNameRef.name });

        setErrors(freshErrors);
        return freshErrors.length === 0;
    };

    const formError = field =>
        errors.filter(err => err.name === field);

    useEffect(() => {
        dispatch(retrievePetAccounts());
    }, []);

    return (
        <PageWrapper pageTitle='Pet Profile'>
            <Paper className={classes.paper}>
    {petAccounts.map(acc => <p key={acc._id}>{acc.petName}</p>)}
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.grid}>
                        <PetType/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.grid}>
                        <ProfileImage/>
                        <div className={classes.fieldWrapper}>
                            <PTextField
                                label='Pet Name'
                                name='petName'
                                inputRef={el => petNameRef = el}
                                error={formError('petName').length > 0}
                            >
                                Pet Name
                            </PTextField>
                        </div>
                        <div className={classes.fieldWrapper}>
                            <BirthDatePicker value={dob} onChange={handleDOBChange}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid container justify='center'>
                    <PButton onClick={handleCreate}>
                        Create Pet Profile
                    </PButton>
                </Grid>
            </Paper>
        </PageWrapper>    
    );
}

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(3)
    },
    grid: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fieldWrapper: {
        margin: `0 ${theme.spacing(1)}px`
    }
});

const mapStateToProps = ({ pets }) => ({
    petAccounts: pets ? pets.accounts : []
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CreatePetProfile));