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
import Add from '@material-ui/icons/Add';
import EmojiPeopleIcon from '@material-ui/icons/Person';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Search from './Search';
import { logout } from './../utils/ApiUtils';

const drawerWidth = 256;

const ApplicationDrawer = ({ classes, dispatch, open, handleDrawer, authenticated }) => {

    const handleLogout = () => {
        logout(dispatch);
        handleDrawer();
    };

    // TODO implement proper logout with token removal on server
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
            <Hidden smUp>
                <Search/>
            </Hidden>
            {
                authenticated &&
                <React.Fragment>
                    <List>
                        <ListItem button component={Link} to='/create/pet/profile' onClick={handleDrawer}>
                            <ListItemIcon>
                                <Add/>
                            </ListItemIcon>
                            <ListItemText primary='Pet Profile'/>
                        </ListItem>
                        <ListItem button component={Link} to='/user/profile' onClick={handleDrawer}>
                            <ListItemIcon>
                                <EmojiPeopleIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Pet Owner Profile'/>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsApplications/>
                            </ListItemIcon>
                            <ListItemText primary='Settings'/>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to='/login' onClick={handleLogout}>
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
                    <ListItem>
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