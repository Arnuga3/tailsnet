import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MenuItem } from '@material-ui/core';
import PTextField from './../commons/generic/PTextField';

const BasicDetails = ({ classes, title, name, surname, onFormItemChange, errors }) => {

    const handleChange = ({ target }) =>
        onFormItemChange(target.name, target.value);

    const formError = field =>
        errors.filter(err => err.name === field);
    
    return (
        <div className={classes.wrapper}>
            <PTextField select
                label='Title'
                name='title'
                value={title}
                onChange={handleChange}
                error={formError('title').length > 0} 
            >
                <MenuItem value={0}>&nbsp;</MenuItem>
                <MenuItem value={'Mr'}>Mr</MenuItem>
                <MenuItem value={'Mrs'}>Mrs</MenuItem>
                <MenuItem value={'Ms'}>Ms</MenuItem>
            </PTextField>
            <PTextField 
                label='Name'
                name='name' 
                value={name} 
                onChange={handleChange}
                error={formError('name').length > 0}
            >
                Name
            </PTextField>
            <PTextField
                label='Surname' 
                name='surname'
                value={surname}
                onChange={handleChange}
                error={formError('surname').length > 0}
            >
                Surname
            </PTextField>
        </div>
    );
};

const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column'
    }
});

export default withStyles(styles)(BasicDetails);