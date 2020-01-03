import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import PTextField from '../commons/generic/PTextField';
import PButton from '../commons/generic/PButton';
import ProfileImage from '../commons/ProfileImage';
import BirthDatePicker from '../commons/BirthDatePicker';
import PetType from '../commons/PetType';
import PageWrapper from '../commons/generic/PageWrapper';
import { retrieveAndStoreUserPets } from '../../actions/userActions';
import { createAndStorePetAccount } from '../../actions/petActions';

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

    handleDOBChange = (dob, date) =>
        this.setState({ dob: date });

    handleTypeChange = type =>
        this.setState({ petType: type });

    handleCreate = () => {
        const { dob, petType } = this.state;
        const { dispatch } = this.props;
        const isDataValid = this.validateForm();
        if (isDataValid) {
            dispatch(createAndStorePetAccount({
                petName: this.petNameRef.value,
                dob,
                petType: petType.type
            }));
            this.cleanForm();
        } else console.error('Not all data provided');
    };

    cleanForm = () => {
        this.petNameRef.value = '';
        this.setState({ dob: null });
    }

    validateForm = () => {
        let { petType } = this.state;
        let freshErrors = [];
        this.setState({ errors: [] });

        if (petType === null)
            freshErrors.push({ name: 'petType' });

        if (this.petNameRef.value.trim() === '')
            freshErrors.push({ name: this.petNameRef.name });

        this.setState({ errors: freshErrors })
        return freshErrors.length === 0;
    };

    formError = field =>
        this.state.errors.filter(err => err.name === field);

    render() {
        
        let { dob } = this.state;
        const { classes, userStore } = this.props;
        const pets = userStore.pets;

        return (
            <PageWrapper pageTitle='Pets'>
                <Paper className={classes.paper}>
                    <Grid container>
                        <Grid item xs={12} md={6} className={classes.grid}>
                            {
                                pets &&
                                pets.map(pet => <div key={pet.id}>{pet.name}</div>)
                            }
                            <PetType onTypeChange={this.handleTypeChange}/>
                        </Grid>
                        <Grid item xs={12} md={6} className={classes.grid}>
                            <ProfileImage/>
                            <div className={classes.fieldWrapper}>
                                <PTextField
                                    label='Pet Name'
                                    name='petName'
                                    inputRef={el => this.petNameRef = el}
                                    error={this.formError('petName').length > 0}
                                >
                                    Pet Name
                                </PTextField>
                            </div>
                            <div className={classes.fieldWrapper}>
                                <BirthDatePicker value={dob} onFormItemChange={this.handleDOBChange}/>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container justify='center'>
                        <PButton onClick={this.handleCreate}>
                            Create Pet Profile
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
    },
    grid: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    fieldWrapper: {
        margin: `0 ${theme.spacing(1)}px`
    }
});

const mapStateToProps = ({ userStore, petStore }) => ({
    userStore,
    petStore
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Pets));