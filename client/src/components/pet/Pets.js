import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Grid, Paper, IconButton } from '@material-ui/core';
import PageWrapper from '../commons/generic/PageWrapper';
import PetCard from './PetCard';
import Add from '@material-ui/icons/Add';
import { retrieveAndStoreUserPets } from '../../actions/userActions';

class Pets extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            petType: null,
            dob: null,
            errors: []
        };
        this.petNameRef = React.createRef();
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(retrieveAndStoreUserPets());
    }

    render() {
        const { classes, userStore } = this.props;
        const pets = userStore.pets;

        return (
            <PageWrapper pageTitle='Pets'>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item className={classes.grid}>
                            {
                                pets &&
                                pets.map(pet => <PetCard key={pet.id} pet={pet}/>)
                            }
                            <IconButton color='primary' component={Link} to='/user/pets/create' aria-label='add'>
                                <Add/>
                            </IconButton>
                        </Grid>
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
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    fieldWrapper: {
        margin: `0 ${theme.spacing(1)}px`
    }
});

const mapStateToProps = ({ userStore }) => ({
    userStore
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Pets));