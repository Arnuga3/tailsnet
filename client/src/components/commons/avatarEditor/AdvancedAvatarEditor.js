import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import Save from '@material-ui/icons/SaveOutlined';
import Clear from '@material-ui/icons/Clear';
import Helper from '../../../utils/Helper';
import AvatarEditor from 'react-avatar-editor';
import ImageSelect from './ImageSelect';
import AvatarPreviewEdit from './AvatarPreviewEdit';
import AvatarZoomControls from './AvatarZoomControls';
import AvatarRotateControls from './AvatarRotateControls';

AdvancedAvatarEditor.propTypes = {
    classes: PropTypes.object,
    dispatch: PropTypes.func,
    onSave: PropTypes.func,
    onSaveEnd: PropTypes.func,
    onEdit: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    actionButtons: PropTypes.bool,
    label: PropTypes.string,
    image: PropTypes.string,
    onImageSelected: PropTypes.func,
    isPreview: PropTypes.bool
};

const AdvancedAvatarEditor = ({
    classes,
    dispatch,               //  Option 1: Pass redux dispatch
    onSave,                 //  Option 1: Pass action need to be dispatched
    onSaveEnd,
    actionButtons=true,     //  Option 1: true - display Save button to trigger the action dispatch
    onChange,               //  Option 2: Return canvas image (used to handle upload in parent component)
    onEdit,
    onCancel,
    label,
    image,
    imageState,
    onImageSelected,
    isPreview
}) => {

    const [imgState, setImgState] = useState({
        _position: imageState.position || { x: 0, y: 0 },
        _degree: imageState.degree || 0,
        _zoom: imageState.zoom || 1
    });
    const ref = React.createRef();

    /* Preview */
    const [selectedImg, setSelectedImg] = useState(null);
    const handleSelect = selectedImg => {
        setSelectedImg(selectedImg);
        onImageSelected(selectedImg);
    };

    /* Save */
    
    const handleSave = () => {
        if (ref) {
            const avatarImage = ref.getImageScaledToCanvas();
            avatarImage.toBlob(blob => {
                var formData = new FormData();
                formData.append('avatarImage', blob);
                dispatch(onSave(formData));
                onSaveEnd();
            });
        }
    };

    useEffect(() => {
        return () => {
            const state = readFromSession();
            console.log(state);
            onChange({
                position: state._position,
                degree: state._degree,
                zoom: state._zoom,
            });
        }
    }, []);

    const writeToSession = state => {
        const jsonState = JSON.stringify(state);
        sessionStorage.setItem('imgState', jsonState);
    };

    const readFromSession = () => {
        const jsonState = sessionStorage.getItem('state');
        return JSON.parse(jsonState);
    };

    const handlePositionChange = _position => {
        if (ref.current) return ref.current
            .getImageScaledToCanvas()
            .toBlob(blob => {
                const state = { ...imgState, _position, blob };
                setImgState(state);
                writeToSession(state);
            });
    };

    const handleRotate = _degree => {
        if (ref.current) return ref.current
            .getImageScaledToCanvas()
            .toBlob(blob => {
                const state = { ...imgState, _degree, blob };
                setImgState(state);
                writeToSession(state);
            });
    };

    const handleZoom = _zoom => {
        if (ref.current) return ref.current
            .getImageScaledToCanvas()
            .toBlob(blob => {
                const state = { ...imgState, _zoom, blob };
                setImgState(state);
                writeToSession(state);
            });
    };
    // Convert zoom value (1-2) to slider's value (0-100)
    const slidersValue = (imgState._zoom - 1) * 100;

    const displayImage = selectedImg || image || Helper.NO_IMAGE();
    const hasImage = image || selectedImg;
    const { _position, _zoom, _degree } = imgState;

    return (
        isPreview ?
        <AvatarPreviewEdit
            image={image}
            label={label}
            onEdit={onEdit}
        />
        :
        <React.Fragment>
            <div className={classes.flexRow}>
                <ImageSelect onSelect={handleSelect}/>
            </div>
            <div className={classes.flexRow}>
                <AvatarEditor
                    style={{   // Canvas
                        width: '100%', 
                        height: 'auto',
                        maxWidth: '250px'
                    }}
                    ref={ref}
                    image={displayImage}
                    borderRadius={200}
                    border={50}
                    color={[255, 255, 255, 0.9]}
                    scale={_zoom}
                    rotate={_degree}
                    position={imageState.position}
                    onPositionChange={handlePositionChange}
                />
            </div>
            <div className={classes.flexRow}>
                <div className={classes.flexColumn}>
                    { 
                        hasImage &&
                        <AvatarZoomControls
                            value={slidersValue}
                            onZoomChange={handleZoom}
                        />
                    }
                    <div className={classes.flexRow}>
                        {
                            hasImage &&
                            <React.Fragment>
                                <AvatarRotateControls onRotateChange={handleRotate}/>
                                {
                                    actionButtons ?
                                    <React.Fragment>
                                        <Fab className={classes.iconButton}
                                            onClick={handleSave}
                                            color='primary'
                                            size='medium'
                                        >
                                            <Save/>
                                        </Fab>
                                        <Fab className={classes.iconButton}
                                            onClick={onCancel}
                                            size='medium'
                                        >
                                            <Clear/>
                                        </Fab>
                                    </React.Fragment>
                                    : null
                                }
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
    }
});

export default withStyles(styles)(AdvancedAvatarEditor);