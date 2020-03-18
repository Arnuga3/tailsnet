import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import Loader from './../../commons/generic/Loader';
import PostCreate from './PostCreate';
import Post from './Post';
import { getAndStorePosts } from './../../../actions/postActions';

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
    <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && <Box pt={1}>{children}</Box>}
    </Typography>
    );
}

const Posts = ({ classes, dispatch, petData, petsPosts }) => {
    const petId = petData.id;
    const [petPosts, setPetPosts] = useState(null);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        dispatch(getAndStorePosts(petId));
    }, []);

    useEffect(() => {
        setPetPosts(petsPosts[petId]);
    }, [petsPosts]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <Tabs value={value} onChange={handleChange}>
                <Tab label='All Posts' {...a11yProps(0)} />
                <Tab label='My posts' {...a11yProps(1)} />
                <Tab label='New Post' {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                {
                    petPosts ?
                        petPosts.map(post => <Post petData={petData} post={post}/>)
                        : <Loader/>
                }
            </TabPanel>
            <TabPanel value={value} index={1}>
                {
                    petPosts ?
                        petPosts
                            .filter(post => post.pet_id === petData.id)
                            .map(post => <Post petData={petData} post={post}/>)
                        : <Loader/>
                }
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PostCreate petData={petData}/>
            </TabPanel>
        </React.Fragment>
    );
};

const styles = theme => ({

});

const mapStateToProps = ({ petStore }) => ({
    petsPosts: petStore.petsPosts
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Posts));