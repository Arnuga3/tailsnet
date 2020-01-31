import React from 'react';
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const BirthDatePicker = ({ value, onFormItemChange, errors=false }) => {
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
                    error={errors}
                />
            </MuiPickersUtilsProvider>
    );
}

export default BirthDatePicker;