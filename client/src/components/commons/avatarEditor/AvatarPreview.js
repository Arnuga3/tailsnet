import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

AvatarPreview.propTypes = {
    classes: PropTypes.object,
    image: PropTypes.string,
    label: PropTypes.string.isRequired
};

const AvatarPreview = ({ classes, image, label }) => {
    const avatar = image ? `/${image}.jpg` : null;
    const [error, setError] = useState(false);
    return (
        (avatar && !error) ?
        <Avatar className={classes.avatar}
            imgProps={{onError: () => setError(true)}}
            src={avatar}
            alt={label}
        />
        :
        <Avatar className={classes.avatarCaps}>
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
        fontSize: theme.spacing(2)
    },
});

export default withStyles(styles)(AvatarPreview);