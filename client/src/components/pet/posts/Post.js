import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import AvatarPreview from '../../commons/avatar/AvatarPreview';
import Helper from './../../../utils/Helper';

const Post = ({ classes, petData, post='' }) => {
    const { name='', profile_image='' } = petData;
    const { description='', date_created='', image=null } = post;

    const getImage = str => {
        return `/image/${str}.jpg`;
    }; 

    return (
        <Box p={1} mt={1}
            className={classes.post}
            border={1}
            borderColor='grey.300'
            borderRadius={4}
        >
            <div className={classes.wrapper}>
                <div className={classes.headerWrapper}>
                    <div className={classes.avatarWrapper}>
                        <AvatarPreview image={getImage(profile_image)} label={name} size='small'/>
                        <Typography variant='subtitle2'>{name}</Typography>
                    </div>
                    <Typography variant='caption' color='secondary'>
                        {Helper.toLocalDateTimeString(date_created)}
                    </Typography>
                </div>
                <Typography>
                    {description}
                </Typography>
                { image && <img className={classes.image} src={image} alt='post image'/>}
                <div className={classes.buttonWrapper}>
                    <div>
                        Like
                    </div>
                    <div>
                        Comments
                    </div>
                </div>
            </div>
        </Box>
    );
}

const styles = theme => ({
    avatarWrapper: {
        display: 'flex',
        alignItems: 'center'
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    },
    headerWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    image: {
        width: 'fit-content'
    }
});

export default withStyles(styles, { withTheme: true })(Post);