import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/EditOutlined';
import AvatarPreview from './AvatarPreview';

AvatarPreview.propTypes = {
    classes: PropTypes.object,
    image: PropTypes.string,
    label: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired
};

const AvatarPreviewEdit = ({ classes, label, image, onEdit }) => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.avatarWrapper}>
                <AvatarPreview image={image} label={label}/>
                <IconButton className={classes.editBtn}
                    onClick={onEdit} 
                >
                    <Edit/>
                </IconButton>
            </div>
        </div>
    );
}

const styles = theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%'
    },
    avatarWrapper: {
        position: 'relative'
    },
    editBtn: {
        position: 'absolute',
        top: '40%',
        left: '105%'
    }
});

export default withStyles(styles)(AvatarPreviewEdit);