import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';

const PTextField = ({
    classes,
    select=false, 
    children, 
    value, 
    label, 
    name, 
    inputRef, 
    type='text', 
    error=false, 
    onChange, 
    onBlur 
}) => {
    // FIXME - Fix height of title field
    return (
            <TextField
                fullWidth
                select={select}
                variant='outlined'
                margin='dense'
                label={label}
                name={name}
                inputRef={inputRef}
                type={type}
                error={error}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            >
                {children}
            </TextField>
    );
}

const styles = theme => ({});

export default withStyles(styles, { withTheme: true })(PTextField);