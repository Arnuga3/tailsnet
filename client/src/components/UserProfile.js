import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, MenuItem } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';
import PButton from './commons/generic/PButton';
import ProfileImage from './commons/ProfileImage';
import BasicDetails from './user/BasicDetails';
import PTextField from './commons/generic/PTextField';
import { retrieveAndStoreUserAccount } from './../actions/userActions';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            errors: []
        };
        this.nameRef = React.createRef();
        this.surnameRef = React.createRef();
    }

    componentDidMount() {
        const { dispatch, userStore } = this.props;
        const user = userStore.account;
        if (!user)
            dispatch(retrieveAndStoreUserAccount());
    }

    handleFormItemChange = (item, value) =>
        this.setState({ user: {...this.state.user, [item]: value } });

    formError = field =>
        this.state.errors.filter(err => err.name === field);

    render() {
        const { classes, userStore } = this.props;
        const user = userStore.account;
        const aUser = { ...user, ...this.state.user };
        const { title, name, surname } = aUser;
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
                                    title={title}
                                    name={name}
                                    surname={surname}
                                    onFormItemChange={this.handleFormItemChange}
                                    errors={this.state.errors}
                                />
                            </Grid>
                        </Grid>
                    }
                    <Grid container justify='center'>
                        <PButton onClick={()=>{}}>
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
    userStore
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(UserProfile));