import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import ImageSearch from '@material-ui/icons/ImageSearch';
import AddAPhoto from '@material-ui/icons/AddAPhotoOutlined';

const ImageUpload = ({ classes, onUpload }) => {

    const handleChange = e => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = ev => onUpload(ev.target.result);
        }
    };
  
    return (
        <React.Fragment>
            <input
                className={classes.input}
                id='upload-image-file'
                accept='image/*'
                type='file'
                onChange={handleChange}
            />
            <label htmlFor='upload-image-file'>
                <IconButton className={classes.iconButton} component='span'>
                    <ImageSearch/>
                </IconButton>
            </label>
            <IconButton disabled className={classes.iconButton}>
                <AddAPhoto/>
            </IconButton>
        </React.Fragment>
    );
}

const styles = theme => ({
    input: {
        display: 'none'
    },
    iconButton: {
        margin: theme.spacing(1)
    }
});

export default withStyles(styles)(ImageUpload);