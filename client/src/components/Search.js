import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

const Search = ({ classes, light = false }) => {
    return (
        <Paper className={classes.paper} elevation={0}>
            <InputBase className={light ? classes.input : ''} placeholder='Search...'/>
            <IconButton type='submit' size='small'>
                <SearchIcon className={light ? classes.icon : ''}/>
            </IconButton>
        </Paper>
    );
}

const styles = theme => ({
    paper: {
        backgroundColor: 'rgba(255,255,255,.2)',
        maxWidth: 250,
        display: 'flex',
        justifyContent: 'space-between',
        padding: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        margin: theme.spacing(1)
    },
    input: {
        color: 'rgba(255,255,255)',
        fontWeight: 'bold'
    },
    icon: {
        color: 'rgba(255,255,255)'
    }
});

export default withStyles(styles, { withTheme: true })(Search);