import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const BirthDatePicker = ({ classes, value, onFormItemChange, errors=[] }) => {

    const formError = field =>
        errors.filter(err => err.name === field);

    return (
        <div className={classes.wrapper}>
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
        </div>
    );
}

const styles = theme => ({
    wrapper: {
        maxWidth: 350
    }
});

export default withStyles(styles, { withTheme: true })(BirthDatePicker);