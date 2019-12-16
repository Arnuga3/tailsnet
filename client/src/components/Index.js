import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ApplicationNotifier from './ApplicationNotifier';
import ApplicationBar from './ApplicationBar';
import ApplicationDrawer from './ApplicationDrawer';
import Home from './Home';
import CreatePetProfile from './pet/CreatePetProfile';
import Login from './Login';
import Register from './Register';
import UserProfile from './UserProfile';
import { retrieveAndStoreUserAccount } from './../actions/userActions';

const drawerWidth = 256;

const AuthRoute = ({ component: Component, auth, ...restProp }) => {
    return (
        <Route {...restProp} render={props =>
            auth
            ? <Component {...props}/>
            : <Redirect to='/login' push/>
        }/>
    );
};

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            open: false
        };
    }

    componentDidMount() {
        const { auth } = this.props;
        if (auth)
            this.props.dispatch(retrieveAndStoreUserAccount());
    }

    handleDrawer = () => {
        this.setState({
            open: !this.state.open
        });
    }

    render() {
        const { classes, auth } = this.props;
        const { open } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <ApplicationBar open={open} handleDrawer={this.handleDrawer}/>
                <main className={classes.content}>
    
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/login' component={Login}/>
                        <Route path='/register' component={Register}/>
                        <AuthRoute auth={auth} path='/user/profile' component={UserProfile}/>
                        <AuthRoute auth={auth} path='/create/pet/profile' component={CreatePetProfile}/>
                    </Switch>
                    <ApplicationNotifier/>
    
                </main>
                <ApplicationDrawer open={open} handleDrawer={this.handleDrawer}/>
            </div>
        );
    }
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

const mapStateToProps = ({ userStore }) => ({
    auth: userStore.authenticated
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Index));