import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from '../commons/generic/PageWrapper';
import AdvancedAvatarEditor from '../commons/avatarEditor/AdvancedAvatarEditor';
import DetailsRead from './DetailsRead';
import DetailsEdit from './DetailsEdit';
import Loader from './../commons/generic/Loader';
import {
    retrieveAndStoreUserAccount,
    uploadUserProfileImage
} from '../../actions/userActions';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarMode: true,  // create/preview
            editDetails: false
        };
    }

    componentDidMount() {
        this.props.dispatch(retrieveAndStoreUserAccount());
    }

    handleAvatarEdit = () => {
        this.setState({ avatarMode: !this.state.avatarMode });
    }

    handleDetailsEdit = () => {
        this.setState({ editDetails: !this.state.editDetails });
    }

    getUserInitials = user => {
        if (user && user.name && user.surname) {
            return `${user.name[0]}${user.surname[0]}`;
        } else return '##';
    }

    render() {
        const { avatarMode, editDetails } = this.state;

        const { dispatch, classes, user } = this.props;
        const profile_image = user && user.profile_image ? `/${user.profile_image}.jpg` : null;
        const userInitials = this.getUserInitials(user);

        return (
            <PageWrapper pageTitle='User Profile'>
                    { user ? 
                            <Paper className={classes.paper}>
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <AdvancedAvatarEditor
                                            label={userInitials}
                                            image={profile_image}
                                            isPreview={avatarMode}
                                            onEdit={this.handleAvatarEdit}
                                            onCancel={this.handleAvatarEdit}
                                            onSave={uploadUserProfileImage}
                                            onSaveEnd={this.handleAvatarEdit}
                                            dispatch={dispatch}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}
                                        className={classes.details}
                                        justify='center'
                                    >
                                        {
                                            editDetails
                                            ? <DetailsEdit user={user} onUpdate={this.handleDetailsEdit}/>
                                            : <DetailsRead user={user} onEdit={this.handleDetailsEdit}/>
                                        }
                                    </Grid>
                                </Grid>
                            </Paper>
                        :   <Loader/>
                    }
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