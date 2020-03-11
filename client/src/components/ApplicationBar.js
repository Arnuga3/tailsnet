import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Hidden, IconButton, Button } from '@material-ui/core';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import Search from './Search';
import AvatarPreview from './commons/avatar/AvatarPreview';

const drawerWidth = 256;

const ApplicationBar = ({ classes, open, handleDrawer, authenticated, user }) => {
    const isLoginScreen = window.location.pathname === '/login';
    return (
        <AppBar position='fixed'
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}
        >
            <Toolbar className={classes.toolbar}>
                <img className={classes.logoImg} src='/TAILSNETW.png' alt='logo'/>
                <Hidden smDown>
                    <Search light/>
                </Hidden>
                <div className={classes.rightSide}>
                    {
                        (!authenticated && !isLoginScreen)
                        ? <Button component={Link} to='/login' color='secondary'>Login</Button>
                        : user
                            ? <AvatarPreview image={user.profile_image} label={`${user.name[0]}${user.surname[0]}`}/>
                            : null
                    }
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='end'
                        onClick={handleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                </div>
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
    },
    rightSide: {
        display: 'flex',
        alignItems: 'center'
    }
});

const mapStateToProps = ({ userStore }) => ({
    authenticated: userStore.authenticated,
    user: userStore.account
});

export default connect(mapStateToProps)(withStyles(styles,{withTheme:true})(ApplicationBar));