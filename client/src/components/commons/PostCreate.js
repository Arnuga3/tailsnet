import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, IconButton } from '@material-ui/core';
import ImageSelect from './avatarEditor/ImageSelect';
import AvatarPreview from './../commons/avatarEditor/AvatarPreview';

const PostCreate = ({ classes, petData }) => {

    const getImage = str => {
        return `/image/${str}.jpg`;
    };

    return (
        <Box className={classes.post} boxShadow={3} borderRadius={4} p={.5}>
            <div className={classes.wrapper}>
                <AvatarPreview image={getImage(petData.profile_image)} label={petData.name} size='small'/>
                <TextField
                    className={classes.input}
                    fullWidth
                    variant='outlined'
                    label='What are you up to today?'
                    multiline
                    rows='2'
                />
            </div>
            <div className={classes.buttonWrapper}>
                <div>
                    <ImageSelect onSelect={() => {}}/>
                </div>
                <div>
                    <Button
                        className={classes.button}
                        variant='contained'
                        color='primary'
                    >
                        Post
                    </Button>
                </div>
            </div>
        </Box>
    );
}

const styles = theme => ({
    input: {
        margin: `${theme.spacing(.5)}px 0`
    },
    wrapper: {
        display: 'flex'
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        margin: theme.spacing(1)
    }
});

export default withStyles(styles, { withTheme: true })(PostCreate);