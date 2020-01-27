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

    return (
        <React.Fragment>
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
                <Button onClick={onUpdate} className={classes.cancelBtn}>
                     Cancel
                </Button>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleUpdate}
                    startIcon={<Save fontSize='small'/>}
                >
                    Save
                </Button>
            </Box>
        </React.Fragment>
    );
};

const styles = theme => ({
    cancelBtn: {
        marginRight: theme.spacing(1)
    }
});

const mapStateToProps = ({ userStore }) => ({
    user: userStore.account
});

export default connect(mapStateToProps)(withStyles(styles,{withTheme: true})(DetailsEdit));