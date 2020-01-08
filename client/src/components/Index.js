import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApplicationNotifier from './ApplicationNotifier';
import ApplicationBar from './ApplicationBar';
import ApplicationDrawer from './ApplicationDrawer';
import Home from './Home';
import Pets from './pet/Pets';
import CreatePet from './pet/CreatePet';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import AuthRoute from './AuthRoute';

const drawerWidth = 256;

const Index = ({ classes }) => {

    const [open, setOpen] = useState(false);
    const handleDrawer = () => setOpen(!open);
    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <ApplicationNotifier/>
            <ApplicationBar open={open} handleDrawer={handleDrawer}/>
            <main className={classes.content}>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <AuthRoute path='/user/profile' component={UserProfile}/>
                    <AuthRoute path='/user/pets/create' component={CreatePet}/>
                    <AuthRoute path='/user/pets' component={Pets}/>
                </Switch>
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

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Index));