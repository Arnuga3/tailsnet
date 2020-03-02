import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApplicationNotifier from './ApplicationNotifier';
import ApplicationBar from './ApplicationBar';
import ApplicationDrawer from './ApplicationDrawer';
import Home from './Home';
import PetRouter from './pet/PetRouter';
import Login from './Login';
import Register from './Register';
import UserProfile from './user/UserProfile';
import AuthRoute from './AuthRoute';

const drawerWidth = 256;
// TODO - Do regression testing to find issues with all the currentt implementation
// TODO - Document avatar editor component (2 modes of usage)
// TODO - Decide if loaders are needed, if not what about user interactions?
// TODO - Review performance optimisation (dynamic import, async components, etc.)
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
                    <AuthRoute path='/user/pets' component={PetRouter}/>
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
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        marginRight: -drawerWidth
    }
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Index));