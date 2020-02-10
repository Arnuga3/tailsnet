import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Slider, IconButton } from '@material-ui/core';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';

AvatarZoomControls.propTypes = {
    classes: PropTypes.object,
    slider: PropTypes.number,
    onZoomChange: PropTypes.func.isRequired
};

const AvatarZoomControls = ({ classes, value, onZoomChange }) => {

    const [zoom, setZoom] = useState(1);    // value 1 - 2

    const handleZoomSlider = (event, newValue) => {
        const zoomValue = newValue / 100 + 1;   // Convert slider's value (0-100) to zoom value (1-2)
        setZoom(zoomValue);
        onZoomChange(zoom);
    };

    const handleZoom = level => {
        if (level === 'in' && zoom <= 1.8)
            setZoom(zoom + .2);
        if (level === 'out' && zoom >= 1.2)
            setZoom(zoom - .2);
        onZoomChange(zoom);
    };

    return (
        <div className={classes.zoomSlider}>
            <IconButton
                onClick={() => handleZoom('out')}
                className={classes.iconButton}
            >
                <ZoomOut/>
            </IconButton>
            <Slider
                min={0}
                max={100}
                width={250}
                height={250}
                step={20}
                value={value}
                onChange={handleZoomSlider}
            />
            <IconButton
                onClick={() => handleZoom('in')}
                className={classes.iconButton}
            >
                <ZoomIn/>
            </IconButton>
        </div>
    );
}

const styles = theme => ({
    zoomSlider: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
    iconButton: {
        margin: theme.spacing(1)
    }
});

export default withStyles(styles)(AvatarZoomControls);