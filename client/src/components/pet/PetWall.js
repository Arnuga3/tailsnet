import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from './../commons/generic/PageWrapper';
import Loader from './../commons/generic/Loader';
import PostCreate from './posts/PostCreate';
import Post from './posts/Post';
import { retrieveAndStorePetData } from './../../actions/petActions';
import { getAndStorePosts } from './../../actions/postActions';

const PetWall = ({ classes, match, dispatch, petsData, petsPosts }) => {

    const { petId } = match.params;
    const [petData, setPetData] = useState(null);
    const [petPosts, setPetPosts] = useState(null);

    useEffect(() => {
        dispatch(retrieveAndStorePetData(petId));
        dispatch(getAndStorePosts(petId));
    }, []);

    useEffect(() => {
        setPetData(petsData[petId]);
    }, [petsData]);

    useEffect(() => {
        setPetPosts(petsPosts[petId]);
    }, [petsPosts]);

    return (
        <PageWrapper>
            { petData ?
                    <Paper className={classes.paper} square>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md>
                                
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <PostCreate petData={petData}/>
                                {
                                    petPosts ?
                                        petPosts.map(post => <Post petData={petData} post={post}/>)
                                        : <Loader/>
                                }
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
        padding: theme.spacing(1.5)
    },
});

const mapStateToProps = ({ petStore }) => ({
    petsData: petStore.petsData,
    petsPosts: petStore.petsPosts
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(PetWall));