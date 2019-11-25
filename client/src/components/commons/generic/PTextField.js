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
    return (
        <div className={classes.wrapper}>
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
        </div>
    );
}

const styles = theme => ({
    wrapper: {
        maxWidth: 350
    }
});

export default withStyles(styles, { withTheme: true })(PTextField);