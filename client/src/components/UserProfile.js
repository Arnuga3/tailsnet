import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';
import PButton from './commons/generic/PButton';

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
                    <Grid container>
                        <Grid item xs={12} md={6} className={classes.grid}>
                            
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.grid}>
                            
                        </Grid>
                    </Grid>
                    <Grid container justify='center'>
                        <PButton onClick={()=>{}}>
                            Button
                        </PButton>
                    </Grid>
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