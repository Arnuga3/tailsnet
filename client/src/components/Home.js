import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';

// Mui components
import { 
    AppBar,
    Drawer,
    Toolbar,
    IconButton,
    ListItemIcon,
    ListItemText,
    ListItem,
    List,
    Divider,
    Hidden
} from '@material-ui/core';

// Icons
import MenuIcon from '@material-ui/icons/Menu';
import Add from '@material-ui/icons/Add';
import Person from '@material-ui/icons/Person';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// import { retrievePetAccounts } from './../actions/petActions';
import Search from './Search';

const drawerWidth = 256;

const Home = ({ classes, dispatch }) => {

    const [open, setOpen] = useState(false);
    const handleDrawerOpenClose = () => setOpen(!open);

    useEffect(() => {
        // dispatch(retrievePetAccounts());
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
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
                        onClick={handleDrawerOpenClose}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <main className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                
            </main>
            <Drawer
                className={classes.drawer}
                variant='persistent'
                anchor='right'
                open={open}
                classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerOpenClose}>
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
                <Divider />
                <Hidden smUp>
                    <Search/>
                </Hidden>
                <List>
                    <ListItem button component={Link} to='pet/create'>
                        <ListItemIcon>
                            <Add/>
                        </ListItemIcon>
                        <ListItemText primary='Pet Profile'/>
                    </ListItem>
                    <ListItem button>
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
            </Drawer>
        </div>
    );
}

const styles = theme => ({
    root: {
        display: 'flex'
    },
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
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginRight: -drawerWidth
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0
    },
});

const mapStateToProps = ({ pets }) => ({
    petAccounts: pets ? pets.accounts : []
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Home));