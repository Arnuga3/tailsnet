import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import RotateLeft from '@material-ui/icons/RotateLeft';
import RotateRight from '@material-ui/icons/RotateRight';

AvatarRotateControls.propTypes = {
    classes: PropTypes.object,
    value: PropTypes.number.isRequired,
    onRotateChange: PropTypes.func.isRequired
};

const AvatarRotateControls = ({ classes, value, onRotateChange }) => {
    const [degree, setDegree] = useState(value);
    useEffect(() => {
        setDegree(value);
    }, [value]);

    const handleRotate = side => {
        let aDegree = degree;
        if (side === 'left') aDegree += 270;
        if (side === 'right') aDegree += 90;
        setDegree(aDegree);
        onRotateChange(aDegree);
    };
    return (
        <React.Fragment>
            <IconButton className={classes.iconButton}
                onClick={() => handleRotate('left')}
            >
                <RotateLeft/>
            </IconButton>
            <IconButton className={classes.iconButton}
                onClick={() => handleRotate('right')}
            >
                <RotateRight/>
            </IconButton>
        </React.Fragment>
    );
}

const styles = theme => ({
    iconButton: {
        margin: theme.spacing(1)
    }
});

export default withStyles(styles)(AvatarRotateControls);