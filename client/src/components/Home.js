import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';
import ProfileImage from './commons/ProfileImage';

const profiles = [
    {
        id: 1,
        name: "Candy",
    },
    {
        id: 2,
        name: "Rex",
    },
    {
        id: 3,
        name: "Sammy",
    }
];

const Home = ({ classes }) => {
    return (
        <PageWrapper pageTitle='Your Pet Profiles'>
            <Paper className={classes.paper}>
                {profiles.map(p =>
                    <Paper key={p.id} className={classes.card} component={Link} to={`/pet/profile/${p.id}`}>
                        <ProfileImage description={false}/>
                        <Typography variant='subtitle1' color='primary'>
                            {p.name}
                        </Typography>
                    </Paper>
                )}
            </Paper>
        </PageWrapper>
    );
};

const styles = theme => ({
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: theme.spacing(3)
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        textDecoration: 'none'
    }
});

export default withStyles(styles)(Home);