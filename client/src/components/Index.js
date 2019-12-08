import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApplicationRedirect from './ApplicationRedirect';
import ApplicationNotifier from './ApplicationNotifier';
import ApplicationBar from './ApplicationBar';
import ApplicationDrawer from './ApplicationDrawer';
import Home from './Home';
import CreatePetProfile from './pet/CreatePetProfile';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';

const drawerWidth = 256;

const Index = ({ classes }) => {

    const [open, setOpen] = useState(false);
    const handleDrawer = () => setOpen(!open);

    // TODO - Set navigation in the application after login, logout, etc.
    return (
        <div className={classes.root}>
            <CssBaseline />
            <ApplicationBar open={open} handleDrawer={handleDrawer}/>
            <main className={classes.content}>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/user/profile' component={UserProfile}/>
                    <Route exact path='/create/pet/profile' component={CreatePetProfile}/>
                </Switch>
                <ApplicationNotifier/>
                <ApplicationRedirect/>

            </main>
            <ApplicationDrawer open={open} handleDrawer={handleDrawer}/>
        </div>
    );
}

const styles = theme => ({
    root: {
        display: 'flex'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginRight: -drawerWidth
    }
});

export default withStyles(styles, { withTheme: true })(Index);