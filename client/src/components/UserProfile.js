import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';
import PButton from './commons/generic/PButton';
import ProfileImage from './commons/ProfileImage';
import BasicDetails from './user/BasicDetails';
import { retrieveAndStoreUserAccount, editUserAccount } from './../actions/userActions';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: []
        };
    }

    componentDidMount() {
        const { dispatch, user } = this.props;
        if (!user)
            dispatch(retrieveAndStoreUserAccount());
    }

    handleFormItemChange = (item, value) => {
        const { dispatch } = this.props;
        dispatch(editUserAccount({ [item]: value }));
    }

    validateForm = ({ title, name, surname }) => {
        let freshErrors = [];

        if (title === 0)
            freshErrors.push({ name: 'title' });

        if (name.trim() === '')
            freshErrors.push({ name: 'name' });

        if (surname.trim() === '')
            freshErrors.push({ name: 'surname' });

        this.setState({ errors: freshErrors });
        return freshErrors.length === 0;
    };

    formError = field =>
        this.state.errors.filter(err => err.name === field);

    render() {
        const { classes, user } = this.props;
        return (
            <PageWrapper pageTitle='User Profile'>
                <Paper className={classes.paper}>
                    { user &&
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
                            </Grid>
                        </Grid>
                    }
                    <Grid container justify='center'>
                        <PButton onClick={()=>{this.validateForm(user)}}>
                            Button
                        </PButton>
                    </Grid>
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