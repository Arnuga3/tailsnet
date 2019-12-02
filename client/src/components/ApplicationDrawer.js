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

// Icons
import Add from '@material-ui/icons/Add';
import Person from '@material-ui/icons/Person';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Search from './Search';

const drawerWidth = 256;

const ApplicationDrawer = ({ classes, open, handleDrawer }) => {

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
            <List>
                <ListItem button component={Link} to='/create/pet/profile' onClick={handleDrawer}>
                    <ListItemIcon>
                        <Add/>
                    </ListItemIcon>
                    <ListItemText primary='Pet Profile'/>
                </ListItem>
                <ListItem button component={Link} to='/user/profile' onClick={handleDrawer}>
                    <ListItemIcon>
                        <Person/>
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
                <ListItem  button component={Link} to='/login' onClick={()=>{}}>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary='Logout'/>
                </ListItem>
            </List>
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

export default connect()(withStyles(styles, { withTheme: true })(ApplicationDrawer));