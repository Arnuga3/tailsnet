import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const BirthDatePicker = ({ classes, value, onFormItemChange, errors=[] }) => {

    const formError = field =>
        errors.filter(err => err.name === field);

    return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker inputVariant='outlined' margin='dense'
                    fullWidth
                    name='dob'
                    label='Date of birth'
                    disableFuture
                    openTo='year'
                    format='dd/MM/yyyy'
                    views={['year', 'month', 'date']}
                    value={value}
                    onChange={date => onFormItemChange('dob', date)}
                    error={formError('dob').length > 0}
                />
            </MuiPickersUtilsProvider>
    );
}

const styles = theme => ({});

export default withStyles(styles, { withTheme: true })(BirthDatePicker);