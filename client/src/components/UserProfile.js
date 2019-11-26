import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';
import PButton from './commons/generic/PButton';
import ProfileImage from './commons/ProfileImage';
import BirthDatePicker from './commons/BirthDatePicker';
import BasicDetails from './user/BasicDetails';
import {
    retrieveAndStoreUserAccount,
    editUserAccount,
    updateAndStoreUserAccount
} from './../actions/userActions';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            touched: false
        };
    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        if (!user)
            dispatch(retrieveAndStoreUserAccount());
    }

    // TODO - Save in a temp/local user object, update original after successful update on server.
    // Needed to handle cancel updates
    handleFormItemChange = (item, value) => {
        const { dispatch } = this.props;
        dispatch(editUserAccount({ [item]: value }));
        this.setState({ touched: true });
    }

    validateForm = () => {
        const { title, name, surname, dob } = this.props.user;
        let freshErrors = [];

        if (title === 0)
            freshErrors.push({ name: 'title' });

        if (name.trim() === '')
            freshErrors.push({ name: 'name' });

        if (surname.trim() === '')
            freshErrors.push({ name: 'surname' });

        if (dob === null)
            freshErrors.push({ name: 'dob' });

        this.setState({ errors: freshErrors });
        return freshErrors.length === 0;
    };

    handleUpdate = () => {
        const { dispatch, user } = this.props;
        const isDataValid = this.validateForm();

        if(isDataValid)
            dispatch(updateAndStoreUserAccount(user));
    };

    formError = field =>
        this.state.errors.filter(err => err.name === field);

    render() {
        const { classes, user } = this.props;
        return (
            <PageWrapper pageTitle='User Profile'>
                <Paper className={classes.paper}>
                    { user &&
                        <React.Fragment>
                            <Grid container>
                                <Grid item xs={12} md={6} className={classes.grid}>
                                    <ProfileImage/>
                                </Grid>
                                <Grid item xs={12} md={6} className={classes.grid}>
                                    <BasicDetails
                                        title={user.title}
                                        name={user.name}
                                        surname={user.surname}
                                        onFormItemChange={this.handleFormItemChange}
                                        errors={this.state.errors}
                                    />
                                    <BirthDatePicker value={user.dob || null}
                                        onFormItemChange={this.handleFormItemChange}
                                        errors={this.state.errors}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container justify='center'>
                                <PButton disabled={!this.state.touched} onClick={this.handleUpdate}>
                                    Save Changes
                                </PButton>
                            </Grid>
                        </React.Fragment>
                    }
                </Paper>
            </PageWrapper> 
        )
    }
}

const styles = theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: theme.spacing(3)
    }
});

const mapStateToProps = ({ userStore }) => ({
    user: userStore.account
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(UserProfile));