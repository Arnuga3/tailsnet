import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const CreatePetProfile = ({ classes }) => {
    return (
        <Paper>

        </Paper>
    );
}

const styles = theme => ({

});

const mapStateToProps = ({ pets }) => ({
    petAccounts: pets ? pets.accounts : []
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(CreatePetProfile));