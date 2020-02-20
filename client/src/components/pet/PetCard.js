import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Tooltip, Card, CardActionArea, Typography, CardMedia, CardContent } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Helper from './../../utils/Helper';

const PetCard = ({ match, classes, pet }) => {
    const [imgLoadError, setImgLoadError] = useState(false);

    const firstTwoTypeCaps = type => {
        const firstTwoLetters = `${type[0]}${type[1]}`;
        return firstTwoLetters.toUpperCase();
    };

    const getIcon = type => {
        return `/category/${type.toLowerCase()}.png`;
    };

    const { id, name, type, dob, profile_image } = pet;
    const age = Helper.getAgeString(dob);
    const profileImageLoaded = profile_image && !imgLoadError;

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`${match.url}/${id}/wall`}>
                <CardMedia
                    component='img'
                    className={profileImageLoaded ? classes.profileImage : classes.typeIcon}
                    image={
                        profileImageLoaded
                        ? profile_image
                        : getIcon(type)
                    }
                    title={name}
                    onError={() => setImgLoadError(true)}
                />
                <CardContent>
                    <Typography gutterBottom noWrap
                        variant='h6'
                        component='h2'
                        color='secondary'
                    >
                        {name}
                    </Typography>
                    <Typography gutterBottom
                        variant='body2'
                        component='p'
                        color='textLight'
                    >
                        {type}
                    </Typography>
                    <AvatarGroup>
                        <Tooltip title={type} placement='top'>
                            <Avatar className={classes.avatar}>
                                {firstTwoTypeCaps(type)}
                            </Avatar>
                        </Tooltip>
                        <Avatar className={classes.avatarAge}>{age}</Avatar>
                    </AvatarGroup>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

const styles = theme => ({
    card: {
        width: 280,
        height: 235,
        textDecoration: 'none',
        margin: theme.spacing(1)
    },
    profileImage: {
        height: 140
    },
    typeIcon: {
        height: 100,
        width: 100,
        margin: '0 auto',
        padding: 15,
        opacity: .3
    },
    avatar: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.main,
        fontSize: theme.spacing(2)
    },
    avatarAge: {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.main,
        borderWidth: 'thin',
        fontSize: theme.spacing(1.5),
        fontWeight: 'bold',
        letterSpacing: '-1px'
    }
});

export default withStyles(styles)(PetCard);