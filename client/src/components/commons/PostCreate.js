import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, TextField, Button, IconButton } from '@material-ui/core';
import ImageSelect from './avatarEditor/ImageSelect';

const PostCreate = ({ classes }) => {
    return (
        <Box className={classes.post} boxShadow={3} borderRadius={4} p={.5}>
            <TextField
                className={classes.input}
                fullWidth
                variant='outlined'
                label='What are you up to today?'
                multiline
                rows='2'
            />
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
    buttonWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    button: {
        margin: theme.spacing(1)
    }
});

export default withStyles(styles, { withTheme: true })(PostCreate);