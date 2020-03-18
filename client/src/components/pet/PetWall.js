import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography, Box } from '@material-ui/core';
import PageWrapper from './../commons/generic/PageWrapper';
import Loader from './../commons/generic/Loader';
import Posts from './posts/Posts';
import PetProfileProps from './PetProfileProps';
import PetProfileSettings from './PetProfileSettings';
import AuthRoute from './../AuthRoute';
import { retrieveAndStorePetData } from './../../actions/petActions';

const PetWall = ({ classes, match, dispatch, petsData }) => {
    const { petId } = match.params;
    const [petData, setPetData] = useState(null);

    useEffect(() => {
        dispatch(retrieveAndStorePetData(petId));
    }, []);

    useEffect(() => {
        setPetData(petsData[petId]);
    }, [petsData]);

    return (
        <PageWrapper>
            { petData ?
                    <Paper className={classes.paper} square>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md>
                                <PetProfileProps petData={petData}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Switch>
                                    <AuthRoute exact path={`${match.url}`} component={props => <Posts {...props} petData={petData}/>}/>
                                    <AuthRoute exact path={`${match.url}/settings`} component={props => <PetProfileSettings {...props} petData={petData}/>}/>
                                </Switch>
                            </Grid>
                            <Grid item xs={12} md>
                                <Paper className={classes.paper}>Your advertisement can be here</Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                :   <Loader/>
            }
        </PageWrapper>
    );
};

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(1.5)
    },
});

const mapStateToProps = ({ petStore }) => ({
    petsData: petStore.petsData
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(PetWall));