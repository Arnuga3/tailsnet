import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ImageSearch from '@material-ui/icons/ImageSearch';
import AddAPhoto from '@material-ui/icons/AddAPhotoOutlined';
import PIconButtonText from './PIconButtonText';

const ImageUpload = ({ classes, onSelect }) => {

    const handleChange = e => {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = ev => onSelect(ev.target.result);
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
                <PIconButtonText icon={<ImageSearch/>}>
                    Select from Device
                </PIconButtonText>
            </label>
            <PIconButtonText disabled icon={<AddAPhoto/>}/>
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