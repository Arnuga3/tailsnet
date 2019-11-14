import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Search from './Search';

const drawerWidth = 256;

const ApplicationBar = ({ classes, open, handleDrawer }) => {
    return (
        <AppBar position='fixed'
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar className={classes.toolbar}>
                <img className={classes.logoImg} src='/TAILSNETW.png' alt='logo'/>
                <Hidden xsDown>
                    <Search light/>
                </Hidden>
                <IconButton
                    color='inherit'
                    aria-label='open drawer'
                    edge='end'
                    onClick={handleDrawer}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

const styles = theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        boxShadow: 'none'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: drawerWidth
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logoImg: {
        width: 45,
        marginRight: theme.spacing(1)
    }
});

export default withStyles(styles, { withTheme: true })(ApplicationBar);