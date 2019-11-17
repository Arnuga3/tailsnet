import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const BirthDatePicker = ({ classes, value, onChange, error }) => {
    return (
        <div className={classes.wrapper}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker inputVariant='outlined' margin='dense'
                    fullWidth
                    name='DOB'
                    label='Date of birth'
                    disableFuture
                    openTo='year'
                    format='dd/MM/yyyy'
                    views={['year', 'month', 'date']}
                    value={value}
                    onChange={onChange}
                    error={error}
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