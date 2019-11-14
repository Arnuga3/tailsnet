import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, TextField, Typography } from '@material-ui/core';

const CreatePetProfile = ({ classes }) => {

    let petName = React.createRef();

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h4'>New Pet Profile</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <TextField inputRef={el => petName = el} variant='outlined' label='Pet Name' margin='dense'>
                            Pet Name
                        </TextField>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

const styles = theme => ({
    root: {
        flexGrow: 1
    }
});

const mapStateToProps = ({ pets }) => ({
    petAccounts: pets ? pets.accounts : []
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CreatePetProfile));