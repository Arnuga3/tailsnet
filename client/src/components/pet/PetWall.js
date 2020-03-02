import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from './../commons/generic/PageWrapper';
import { retrieveAndStorePetData } from './../../actions/petActions';
import Loader from './../commons/generic/Loader';
import AvatarPreview from './../commons/avatarEditor/AvatarPreview';
import PostCreate from './../commons/PostCreate';

const PetWall = ({ classes, match, dispatch, petsData }) => {

    const [petData, setPetData] = useState(null);
    useEffect(() => {
        dispatch(retrieveAndStorePetData(match.params.petId));
    }, []);

    useEffect(() => {
        setPetData(petsData[match.params.petId]);
    }, [petsData]);

    const getImage = str => {
        return `/image/${str}.jpg`;
    };

    return (
        <PageWrapper pageTitle={petData && petData.name || ''}>
            { petData ?
                    <Paper className={classes.paper}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md>
                                <AvatarPreview image={getImage(petData.profile_image)} label={petData.name} size='small'/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PostCreate/>
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