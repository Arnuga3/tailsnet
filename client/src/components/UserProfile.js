import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 

        };
    }


    render() {
        
        const { classes } = this.props;

        return (
            <PageWrapper pageTitle='User Profile'>
                <Paper className={classes.paper}>
                    
                </Paper>
            </PageWrapper> 
        )
    }
}

const styles = theme => ({
    paper: {

    }
});

const mapStateToProps = ({ pets }) => ({
    pets
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(UserProfile));