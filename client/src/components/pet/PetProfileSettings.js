import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const PetProfileSettings = ({ classes, petData }) => {
    return (
        <Paper>
            {petData.name}
        </Paper>
    );
};

const styles = theme => ({
    
});

export default withStyles(styles, { withTheme: true })(PetProfileSettings);