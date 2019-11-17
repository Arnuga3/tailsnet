import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, Fab, Grid } from '@material-ui/core';

const Home = ({ classes }) => {
    return (
        <div>
            <h1>Hi There!</h1>
        </div>
    );
};

const styles = theme => ({

});

export default withStyles(styles)(Home);