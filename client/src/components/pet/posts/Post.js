import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography, Button, IconButton } from '@material-ui/core';
import AvatarPreview from '../../commons/avatar/AvatarPreview';
import Helper from './../../../utils/Helper';
import ThumbUpAlt from '@material-ui/icons/ThumbUpAltOutlined';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const Post = ({ classes, petData, post='' }) => {
    const { name='', profile_image='' } = petData;
    const { description='', date_created='', image=null } = post;

    const getImage = str => {
        return `/image/${str}.jpg`;
    }; 

    return (
        <Box p={1} mb={1}
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
                <Typography className={classes.description}>
                    {description}
                </Typography>
                { image && <img className={classes.image} src={image} alt='post image'/>}
                <div className={classes.buttonWrapper}>
                    <div>
                        <IconButton size='small' color='primary'>
                            <ThumbUpAlt/>
                        </IconButton>
                        <IconButton size='small' color='secondary'>
                            <FavoriteBorder/>
                        </IconButton>
                    </div>
                    <Button size='small'>
                        Comments
                    </Button>
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
    description: {
        margin: theme.spacing(1)
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