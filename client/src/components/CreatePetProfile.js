import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import PTextField from './commons/generic/PTextField';
import PButton from './commons/generic/PButton';
import ProfileImage from './commons/ProfileImage';
import BirthDatePicker from './commons/BirthDatePicker';
import PetType from './commons/PetType';

const CreatePetProfile = ({ classes }) => {

    let petName = React.createRef();
    const [DOB, handleDOBChange] = useState(null);

    return (
        <div className={classes.root}>
            <Grid container justify='center' maxWidth='sm'>
                <Grid item xs={12} md={9}>
                    <Typography variant='h5' gutterBottom>Pet Profile</Typography>
                </Grid>
                <Grid item xs={12} md={9}>
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
                                    <BirthDatePicker value={DOB} onChange={handleDOBChange}/>
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container justify='center'>
                            <PButton type='submit'>
                                Create Pet Profile
                            </PButton>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1
    },
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