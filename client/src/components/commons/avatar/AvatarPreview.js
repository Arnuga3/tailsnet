import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

AvatarPreview.propTypes = {
    classes: PropTypes.object,
    image: PropTypes.string,
    label: PropTypes.string.isRequired
};

const AvatarPreview = ({ classes, image, label, size='small' }) => {
    const [error, setError] = useState(false);
    const aSize =
        size === 'small' ? classes.sizeS :
        size === 'medium' ? classes.sizeM :
        size === 'large' ? classes.sizeL : null;

    return (
        (image && !error) ?
        <Avatar className={`${classes.avatar} ${aSize}`}
            imgProps={{onError: () => setError(true)}}
            src={image}
            alt={label}
        />
        :
        <Avatar className={`${classes.avatarCaps} ${aSize}`}>
            { label && `${label[0].toUpperCase()} ${label[1].toUpperCase()}` }
        </Avatar>
    );
}

const styles = theme => ({
    avatar: {
        marginRight: theme.spacing(1)
    },
    avatarCaps: {
        marginRight: theme.spacing(1),
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.main,
        fontSize: theme.spacing(2),
        letterSpacing: -1
    },
    sizeS: {
        width: theme.spacing(5),
        height: theme.spacing(5)
    },
    sizeM: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    },
    sizeL: {
        width: theme.spacing(15),
        height: theme.spacing(15)
    }
});

export default withStyles(styles)(AvatarPreview);