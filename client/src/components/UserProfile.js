import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Button, Box } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';
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
            errors: []
        };
    }

    componentDidMount() {
        this.props.dispatch(retrieveAndStoreUserAccount());
    }

    handleFormItemChange = (item, value) => {
        const { dispatch } = this.props;
        dispatch(editUserAccount({ [item]: value }));
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
        const profile_image = user && user.profile_image ? `/${user.profile_image}.jpg` : null;

        return (
            <PageWrapper pageTitle='User Profile'>
                <Paper className={classes.paper}>
                    { user && 
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <ProfileImage dispatch={this.props.dispatch} image={profile_image}/>
                            </Grid>
                            <Grid item xs={12} md={6}
                                className={classes.details}
                                justify='center'
                            >
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
                                <Box display='flex' justifyContent='flex-end' mt={2}>
                                    <Button variant='contained' color='primary' onClick={this.handleUpdate}>
                                        Save
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
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
    },
    details: {
        marginTop: theme.spacing(3)
    }
});

const mapStateToProps = ({ userStore }) => ({
    user: userStore.account
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(UserProfile));