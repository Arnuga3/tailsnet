import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Slider, IconButton } from '@material-ui/core';
import AvatarEditor from 'react-avatar-editor';
import Image from '@material-ui/icons/Image';
import RotateLeft from '@material-ui/icons/RotateLeft';
import RotateRight from '@material-ui/icons/RotateRight';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';

const ProfileImage = ({ classes, image='/test.jpg' }) => {

    const [degree, setDegree] = useState(0);
    const [zoom, setZoom] = useState(1);        // value 1 - 2

    const handleRotate = side => {
        if (side === 'left')
            setDegree(degree + 270);
        else setDegree(degree + 90);
    };

    const handleZoomSlider = (event, newValue) => {
        // Convert slider's value (0-100) to zoom value (1-2)
        const zoomValue = newValue / 100 + 1;
        setZoom(zoomValue);
    };

    const handleZoom = level => {
        if (level === 'in' && zoom <= 1.8)
            setZoom(zoom + .2);
        
        if (level === 'out' && zoom >= 1.2)
            setZoom(zoom - .2);   
    };

    // Convert zoom value (1-2) to slider's value (0-100)
    const sliderValue = (zoom - 1) * 100;

    return (
        <React.Fragment>
            {
                image
                ?
                    <React.Fragment>
                        <div className={classes.avatarEditor}>
                            <AvatarEditor
                                image={image}
                                borderRadius={200}
                                width={250}
                                height={250}
                                border={50}
                                color={[255, 255, 255, 0.8]}
                                scale={zoom}
                                rotate={degree}
                            />
                        </div>
                        <div className={classes.avatarEditor}>
                            <IconButton
                                onClick={() => handleRotate('left')}
                                className={classes.iconButton}
                            >
                                <RotateLeft/>
                            </IconButton>
                            <IconButton
                                onClick={() => handleRotate('right')}
                                className={classes.iconButton}
                            >
                                <RotateRight/>
                            </IconButton>
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
                                    step={20}
                                    value={sliderValue}
                                    onChange={handleZoomSlider}
                                />
                                <IconButton
                                    onClick={() => handleZoom('in')}
                                    className={classes.iconButton}
                                >
                                    <ZoomIn/>
                                </IconButton>
                            </div>
                        </div>
                    </React.Fragment>
                :
                    <Box display="flex" justifyContent="center" alignItems='center' m={1} p={2}
                        width={150}
                        height={150}
                        border={1}
                        borderRadius='50%'
                        borderColor='secondary.main'
                    >
                        <Image color='disabled' fontSize='large'/>
                    </Box>               
            }
        </React.Fragment>
    );
}

const styles = theme => ({
    iconButton: {
        margin: theme.spacing(1)
    },
    avatarEditor: {
        display: 'flex',
        justifyContent: 'center'
    },
    zoomSlider: {
        display: 'flex',
        alignItems: 'center',
        width: '40%'
    }
});

export default withStyles(styles)(ProfileImage);