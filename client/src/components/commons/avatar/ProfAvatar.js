import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, IconButton } from '@material-ui/core';
import Edit from '@material-ui/icons/EditOutlined';

const ProfAvatar = ({ classes, user, image, onEdit }) => {
    const [error, setError] = useState(false);
    return (
        <div className={classes.wrapper}>
            <div className={classes.avatarWrapper}>
                {
                    user && image && !error
                    ?
                        <Avatar
                            alt={user.name}
                            src={image}
                            className={classes.avatar}
                            imgProps={{onError: () => setError(true)}}
                        />
                    :
                        <Avatar className={classes.avatarCaps}>
                            {user.name[0].toUpperCase() + user.surname[0].toUpperCase()}
                        </Avatar>
                }
                <IconButton onClick={onEdit} className={classes.editBtn}>
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
    avatar: {
        width: theme.spacing(20),
        height: theme.spacing(20)
    },
    avatarCaps: {
        width: theme.spacing(20),
        height: theme.spacing(20),
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary,
        borderColor: theme.palette.primary.main,
        fontSize: theme.spacing(10)
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

export default withStyles(styles)(ProfAvatar);