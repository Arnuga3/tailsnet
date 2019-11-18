import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import PTextField from './commons/generic/PTextField';
import PButton from './commons/generic/PButton';
import ProfileImage from './commons/ProfileImage';
import BirthDatePicker from './commons/BirthDatePicker';
import PetType from './commons/PetType';
import { createPetAccount } from './../actions/petActions';
import PageWrapper from './commons/generic/PageWrapper';

const CreatePetProfile = ({ classes, dispatch }) => {

    let petName = React.createRef();
    const [dob, handleDOBChange] = useState(null);
    const type = 'Cat';

    const handleCreate = () => {
        dispatch(createPetAccount({
            petName,
            dob,
            type
        }));
    };

    return (
        <PageWrapper pageTitle='Pet Profile'>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12} md={6} className={classes.grid}>
                        <PetType/>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.grid}>
                        <ProfileImage/>
                        <div className={classes.fieldWrapper}>
                            <PTextField label='Pet Name' inputRef={el => petName = el}>
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