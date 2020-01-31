import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider, IconButton, Fab } from '@material-ui/core';
import AvatarEditor from 'react-avatar-editor';
import RotateLeft from '@material-ui/icons/RotateLeft';
import RotateRight from '@material-ui/icons/RotateRight';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Save from '@material-ui/icons/SaveOutlined';
import Clear from '@material-ui/icons/Clear';
import ImageUpload from './ImageUpload';
import Helper from './../../../utils/Helper';

const ProfAvatarEditor = ({ classes, dispatch, image, onUpdate, onUpdateFinish, onCancel }) => {

    /* Preview Image */
    const [selectedImg, setSelectedImg] = useState(null);
    const handleSelect = selectedImg => setSelectedImg(selectedImg);

    /* Upload/Save Image */
    let avatarEditorRef = editor => avatarEditorRef = editor;
    const handleUpload = () => {
        if (avatarEditorRef) {
            const avatarImage = avatarEditorRef.getImageScaledToCanvas();
            avatarImage.toBlob(blob => {
                var formData = new FormData();
                formData.append('avatarImage', blob);
                dispatch(onUpdate(formData));
                onUpdateFinish();
            });
        }
    };

    /* Edit Image */
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
    let displayImage = selectedImg ? selectedImg : image;
    displayImage = displayImage ? displayImage : Helper.NO_IMAGE();

    return (
        <React.Fragment>
            <div className={classes.flexRow}>
                <ImageUpload onSelect={handleSelect}/>
            </div>
            <div className={classes.flexRow}>
                <AvatarEditor
                    style={{   // Canvas
                        width: '100%', 
                        height: 'auto',
                        maxWidth: '250px'
                    }}
                    ref={avatarEditorRef}
                    image={displayImage}
                    borderRadius={200}
                    border={50}
                    color={[255, 255, 255, 0.9]}
                    scale={zoom}
                    rotate={degree}
                />
            </div>
            <div className={classes.flexRow}>
                <div className={classes.flexColumn}>

                    { (image || selectedImg) &&
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
                    }
                    
                    <div className={classes.flexRow}>
                        { (image || selectedImg) &&
                            <React.Fragment>
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
                                <Fab
                                    color='primary'
                                    onClick={handleUpload}
                                    size='medium'
                                    className={classes.iconButton}
                                >
                                    <Save/>
                                </Fab>
                                <Fab
                                    onClick={onCancel}
                                    size='medium'
                                    className={classes.iconButton}
                                >
                                    <Clear/>
                                </Fab>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

const styles = theme => ({
    iconButton: {
        margin: theme.spacing(1)
    },
    flexRow: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    flexColumn: {
        width: '100%',
        maxWidth: 350,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    zoomSlider: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    }
});

export default withStyles(styles)(ProfAvatarEditor);