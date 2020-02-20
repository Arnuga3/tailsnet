import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Slider, IconButton } from '@material-ui/core';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';

AvatarZoomControls.propTypes = {
    classes: PropTypes.object,
    value: PropTypes.number.isRequired,
    onZoomChange: PropTypes.func.isRequired
};

const AvatarZoomControls = ({ classes, value, onZoomChange }) => {
    const [zoom, setZoom] = useState(value);    // value 1 - 2
    useEffect(() => {
        setZoom(value);
    }, [value]);

    const handleZoomSlider = (event, newValue) => {
        const zoomValue = newValue / 100 + 1;   // Convert slider's value (0-100) to zoom value (1-2)
        setZoom(zoomValue);
        onZoomChange(zoom);
    };

    const handleZoom = level => {
        let aZoom = zoom;
        if (level === 'in' && zoom <= 1.8) aZoom += .2;
        if (level === 'out' && zoom >= 1.2) aZoom -= .2;
        setZoom(aZoom);
        onZoomChange(aZoom);
    };

    // Convert zoom value (1-2) to slider's value (0-100)
    const slidersValue = (value - 1) * 100;

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
                value={slidersValue}
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