import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider, IconButton, Fab } from '@material-ui/core';
import AvatarEditor from 'react-avatar-editor';
import RotateLeft from '@material-ui/icons/RotateLeft';
import RotateRight from '@material-ui/icons/RotateRight';
import ZoomIn from '@material-ui/icons/ZoomIn';
import ZoomOut from '@material-ui/icons/ZoomOut';
import Save from '@material-ui/icons/SaveOutlined';
import ImageUpload from './ImageUpload';
import { uploadUserProfileImage } from '../../../actions/userActions';

const PAvatarEditor = ({ classes, dispatch, image }) => {

    // Icon svg, displayed when there is no image
    const noImage = () => {
        const iconColor = 'rgba(0,0,0,.1)';
        const iconSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="${iconColor}" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-1.96-2.36L6.5 17h11l-3.54-4.71z"/></svg>`;
        return `data:image/svg+xml;utf-8,${iconSVG}`;
    };

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
                dispatch(uploadUserProfileImage(formData));
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
    displayImage = displayImage ? displayImage : noImage();

    return (
        <React.Fragment>
            <div className={classes.flexRow}>
                <ImageUpload onSelect={handleSelect}/>
            </div>
            <div className={classes.flexRow}>
                <AvatarEditor
                    ref={avatarEditorRef}
                    image={selectedImg || image || noImage()}
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

export default withStyles(styles)(PAvatarEditor);