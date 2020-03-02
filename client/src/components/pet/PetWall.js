import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';
import PageWrapper from './../commons/generic/PageWrapper';
import { retrieveAndStorePetData } from './../../actions/petActions';
import Loader from './../commons/generic/Loader';
import PostCreate from './../commons/PostCreate';

const PetWall = ({ classes, match, dispatch, petsData }) => {

    const [petData, setPetData] = useState(null);
    useEffect(() => {
        dispatch(retrieveAndStorePetData(match.params.petId));
    }, []);

    useEffect(() => {
        setPetData(petsData[match.params.petId]);
    }, [petsData]);

    return (
        <PageWrapper>
            { petData ?
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md>
                                {/* <Typography variant='h4'>{petData.name}</Typography> */}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PostCreate petData={petData}/>
                            </Grid>
                            <Grid item xs={12} md>
                                <Paper className={classes.paper}>xs</Paper>
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
        padding: theme.spacing(3)
    },
});

const mapStateToProps = ({ petStore }) => ({
    petsData: petStore.petsData
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(PetWall));