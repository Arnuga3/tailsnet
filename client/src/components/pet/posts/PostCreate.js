import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import ImageSelect from '../../commons/ImageSelect';
import AvatarPreview from '../../commons/avatar/AvatarPreview';
import { createAndStorePost } from '../../../actions/postActions';

const PostCreate = ({ classes, petData, dispatch }) => {
    const { name='', profile_image='' } = petData;

    let textRef = null;
    const [image, setImage] = useState(null);

    const getImage = str => {
        return `/image/${str}.jpg`;
    };

    const handlePost = () => {
        dispatch(createAndStorePost({
            description: textRef.value,
            petId: petData.id,
            image
        }));
    };

    return (
        <Box boxShadow={3} borderRadius={4} p={1}>
            <div className={classes.wrapper}>
                <div className={classes.avatarWrapper}>
                    <AvatarPreview image={getImage(profile_image)} label={name} size='small'/>
                    <Typography variant='subtitle2'>{name}</Typography>
                </div>
                <TextField
                    inputProps={{
                        ref: input => textRef = input
                    }}
                    className={classes.input}
                    fullWidth
                    variant='outlined'
                    label=''
                    multiline
                    rows='2'
                />
                { image && <img className={classes.image} src={image} alt='post image'/>}
                <div className={classes.buttonWrapper}>
                    <div>
                        <ImageSelect onSelect={image => setImage(image)} noText/>
                    </div>
                    <div>
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='primary'
                            onClick={handlePost}
                        >
                            Post
                        </Button>
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
    input: {
        margin: `${theme.spacing(1)}px 0`
    },
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        margin: theme.spacing(1)
    },
    image: {
        width: 'fit-content'
    }
});

const mapStateToProps = ({ petStore }) => ({
    petStore
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(PostCreate));