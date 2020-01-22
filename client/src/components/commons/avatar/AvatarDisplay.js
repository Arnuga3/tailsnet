import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

const AvatarDisplay = ({ classes, user }) => {
    const avatar = user && user.profile_image ? `/${user.profile_image}.jpg` : null;
    const [error, setError] = useState(false);  // Load initials if image not loaded
    return (
        (avatar && !error)
        ?
            <Avatar className={classes.avatar}
                imgProps={{onError: () => setError(true)}}
                alt={user.name}
                src={avatar}
            />
        :
            <Avatar className={classes.avatarCaps}>
                {user.name[0].toUpperCase() + user.surname[0].toUpperCase()}
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

export default withStyles(styles)(AvatarDisplay);