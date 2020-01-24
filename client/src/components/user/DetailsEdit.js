import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Box, Button } from '@material-ui/core';
import Save from '@material-ui/icons/SaveOutlined';
import BirthDatePicker from './../commons/BirthDatePicker';
import BasicDetails from './BasicDetails';
import {
    editUserAccount,
    updateAndStoreUserAccount
} from './../../actions/userActions';

const DetailsEdit = ({ classes, dispatch, user, onUpdate }) => {

    const [errors, setErrors] = useState([]);

    const handleFormItemChange = (item, value) =>
        dispatch(editUserAccount({ [item]: value }));

    const isFormValid = () => {
        const { title, name, surname, dob } = user;
        let freshErrors = [];

        if (title === 0)
            freshErrors.push({ name: 'title' });

        if (name.trim() === '')
            freshErrors.push({ name: 'name' });

        if (surname.trim() === '')
            freshErrors.push({ name: 'surname' });

        if (dob === null)
            freshErrors.push({ name: 'dob' });

        setErrors(freshErrors);
        return freshErrors.length === 0;
    };

    const handleUpdate = () => {
        if(isFormValid()) {
            dispatch(updateAndStoreUserAccount(user));
            onUpdate();
        }
    };

    const formError = field =>
        errors.filter(err => err.name === field);

    return (
        <div className={classes.wrapper}>
            <BasicDetails
                title={user.title}
                name={user.name}
                surname={user.surname}
                onFormItemChange={handleFormItemChange}
                errors={errors}
            />
            <BirthDatePicker value={user.dob || null}
                onFormItemChange={handleFormItemChange}
                errors={errors}
            />
            <Box display='flex' justifyContent='flex-end' mt={2}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleUpdate}
                    startIcon={<Save fontSize='small'/>}
                >
                    Save
                </Button>
            </Box>
        </div>
    );
};

const styles = theme => ({
    wrapper: {

    }
});

const mapStateToProps = ({ userStore }) => ({
    user: userStore.account
});

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(DetailsEdit));