import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid } from '@material-ui/core';
import PageWrapper from './commons/generic/PageWrapper';
import ProfAvatarEditor from './commons/avatar/ProfAvatarEditor';
import ProfAvatar from './commons/avatar/ProfAvatar';
import DetailsRead from './user/DetailsRead';
import DetailsEdit from './user/DetailsEdit';
import {
    retrieveAndStoreUserAccount
} from './../actions/userActions';

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editAvatar: false,
            editDetails: false
        };
    }

    componentDidMount() {
        this.props.dispatch(retrieveAndStoreUserAccount());
    }

    handleAvatarEdit = () => {
        this.setState({ editAvatar: !this.state.editAvatar });
    }

    handleDetailsEdit = () => {
        this.setState({ editDetails: !this.state.editDetails });
    }

    render() {
        const { editAvatar, editDetails } = this.state;

        const { dispatch, classes, user } = this.props;
        const profile_image = user && user.profile_image ? `/${user.profile_image}.jpg` : null;

        return (
            <PageWrapper pageTitle='User Profile'>
                <Paper className={classes.paper}>
                    { user && 
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                {
                                    editAvatar
                                    ? <ProfAvatarEditor dispatch={dispatch} image={profile_image} onUpdate={this.handleAvatarEdit}/>
                                    : <ProfAvatar image={profile_image} user={user} onEdit={this.handleAvatarEdit}/>
                                }
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