import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
// import { retrievePetAccounts } from './../actions/petActions';
import ApplicationBar from './ApplicationBar';
import ApplicationDrawer from './ApplicationDrawer';
import CreatePetProfile from './CreatePetProfile';
import Login from './Login';
import Register from './Register';

const drawerWidth = 256;

const Home = ({ classes, dispatch }) => {

    const [open, setOpen] = useState(false);
    const handleDrawer = () => setOpen(!open);

    useEffect(() => {
        // dispatch(retrievePetAccounts());
    }, []);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <ApplicationBar open={open} handleDrawer={handleDrawer}/>
            <main className={classes.content}>

                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path={'/pet/create'} component={CreatePetProfile}/>
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

const mapStateToProps = ({ pets }) => ({
    petAccounts: pets ? pets.accounts : []
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Home));