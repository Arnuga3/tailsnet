import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Paper, Card, CardActionArea } from '@material-ui/core';
import PageWrapper from '../commons/generic/PageWrapper';
import PetCard from './PetCard';
import Add from '@material-ui/icons/Add';
import { retrieveAndStoreUserPets } from '../../actions/userActions';
import Loader from './../commons/generic/Loader';

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
        const { match, classes, userStore } = this.props;
        const pets = userStore.pets;
        const arePets = pets && pets.length > 0;

        return (
            <PageWrapper pageTitle='Pets'>
                {
                    arePets ?
                        <Paper className={classes.paper}>
                            <div className={classes.wrapper}>
                                <Card className={classes.cardCreatePet}>
                                    <CardActionArea
                                        component={Link}
                                        to={`${match.url}/create`}
                                        aria-label='add'
                                        className={classes.cardContent}
                                    >
                                        <Add/>
                                    </CardActionArea>
                                </Card>
                                { pets.map(pet => <PetCard key={pet.id} pet={pet} {...this.props} />) }
                            </div>
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
    cardCreatePet: {
        minWidth: 200,
        minHeight: 200,
        textDecoration: 'none',
        margin: theme.spacing(1)
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap'
    },
    cardContent: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = ({ userStore }) => ({
    userStore
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Pets));