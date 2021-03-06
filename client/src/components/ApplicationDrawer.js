import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { 
    Drawer, 
    IconButton, 
    Divider, 
    Hidden,
    List, 
    ListItem, 
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import Pets from '@material-ui/icons/Pets';
import EmojiPeopleIcon from '@material-ui/icons/Person';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Search from './Search';
import { logout as tokenLogout } from './../utils/ApiUtils';
import { logout } from './../actions/userActions';

const drawerWidth = 256;

const ApplicationDrawer = ({ classes, dispatch, open, handleDrawer, authenticated }) => {

    const handleLogout = () => {
        tokenLogout(dispatch);       // delete auth token
        dispatch(logout());     // delete user from redux
        handleDrawer();
    };

    // FIXME - implement proper logout with token removal on server
    return (
        <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='right'
            open={open}
            classes={{ paper: classes.drawerPaper }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawer}>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            <Divider />
            <Hidden mdUp>
                <Search/>
            </Hidden>
            {
                authenticated &&
                <React.Fragment>
                    <List>
                        <ListItem dense button component={Link} to='/user/pets' onClick={handleDrawer}>
                            <ListItemIcon>
                                <Pets/>
                            </ListItemIcon>
                            <ListItemText primary='Pets'/>
                        </ListItem>
                        <ListItem dense button component={Link} to='/user/profile' onClick={handleDrawer}>
                            <ListItemIcon>
                                <EmojiPeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Profile'/>
                        </ListItem>
                    </List>
                    <Divider dense light/>
                    <List>
                        <ListItem dense button>
                            <ListItemIcon>
                                <SettingsApplications/>
                            </ListItemIcon>
                            <ListItemText primary='Settings'/>
                        </ListItem>
                    </List>
                    <Divider dense light/>
                    <List>
                        <ListItem button dense component={Link} to='/login' onClick={handleLogout}>
                            <ListItemIcon>
                                <ExitToApp/>
                            </ListItemIcon>
                            <ListItemText primary='Logout'/>
                        </ListItem>
                    </List>
                </React.Fragment>
            }
            <React.Fragment>
                <List>
                    <ListItem dense>
                        <ListItemText primary='Public link'/>
                    </ListItem>
                </List>
            </React.Fragment>
        </Drawer>
    );
}

const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start'
    }
});

const mapStateToProps = ({ userStore }) => ({
    authenticated: userStore.authenticated
});

export default connect(mapStateToProps)(withStyles(styles,{withTheme: true})(ApplicationDrawer));