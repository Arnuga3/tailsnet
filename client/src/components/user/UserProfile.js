import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from '../commons/generic/PageWrapper';
import AdvancedAvatarEditor from '../commons/avatarEditor/AdvancedAvatarEditor';
import DetailsRead from './DetailsRead';
import DetailsEdit from './DetailsEdit';
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

    render() {
        const { avatarMode, editDetails } = this.state;

        const { dispatch, classes, user } = this.props;
        const profile_image = user && user.profile_image ? `/${user.profile_image}.jpg` : null;

        return (
            <PageWrapper pageTitle='User Profile'>
                <Paper className={classes.paper}>
                    { user && 
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <AdvancedAvatarEditor
                                    label={user.name}
                                    image={profile_image}
                                    isPreview={avatarMode}
                                    onEdit={this.handleAvatarEdit}
                                    onCancelAction={this.handleAvatarEdit}
                                    onUpdate={uploadUserProfileImage}
                                    onUpdateEnd={this.handleAvatarEdit}
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