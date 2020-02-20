import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import PageWrapper from './../commons/generic/PageWrapper';
import { retrieveAndStorePetData } from './../../actions/petActions';

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
            <Paper className={classes.paper}>
                { petData &&
                    <img src={getImage(petData.profile_image)} alt={petData.name}/>
                }
            </Paper>
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