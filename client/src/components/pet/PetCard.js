import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Tooltip, Card, CardActionArea, Typography, CardMedia, CardContent } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

const PetCard = ({ classes, pet }) => {
    const calcAge = date => {
        const today = new Date();
        const dob = new Date(date);
        const msDiff = today.getTime() - dob.getTime();
        let ageStr = '';
        
        const msYear = 365 * 86400000;
        
        const years = msDiff / msYear;
        const yearsRounded = Math.floor(years);

        const months = (years - yearsRounded) * 12;
        const monthsRounded = Math.floor(months);

        const weeks = (months - monthsRounded) * 4.3;
        const weeksRounded = Math.floor(weeks);

        if (yearsRounded > 0)
            ageStr += `${yearsRounded} y`;

        else if (yearsRounded < 1 && monthsRounded > 0)
            ageStr += `${monthsRounded} m`;

        else if (yearsRounded < 1 && monthsRounded < 1 && weeksRounded > 0)
            ageStr += `${weeksRounded} w`;

        return ageStr;
    };

    const age = calcAge(pet.dob);

    return (
        <Card className={classes.card}>
            <CardActionArea component={Link} to={`/user/pets/${pet.id}`}>
                <CardMedia
                    component='img'
                    className={classes.media}
                    image={'/test.jpg'}
                    title='test'
                />
                <CardContent>
                    <Typography gutterBottom variant='h6' component='h2' color='secondary'>
                        {pet.name}
                    </Typography>
                    <Typography gutterBottom variant='body2' component='p' color='textLight'>
                        {pet.name}
                    </Typography>
                    <AvatarGroup>
                        <Tooltip title={pet.type} placement='top'>
                            <Avatar className={classes.avatar}>
                                {pet.type[0].toUpperCase() + pet.type[1].toUpperCase()}
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
        maxWidth: 250,
        minWidth: 200,
        textDecoration: 'none',
        margin: theme.spacing(2)
    },
    media: {
        height: 140
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