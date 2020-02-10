import React, { useState } from 'react';
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
    onImageSelected,
    isPreview
}) => {

    /* Preview */
    const [selectedImg, setSelectedImg] = useState(null);
    const handleSelect = selectedImg => {
        setSelectedImg(selectedImg);
        onImageSelected(selectedImg);
    };

    /* Save */
    let avatarEditorRef = React.createRef();
    const handleSave = () => {
        if (avatarEditorRef.current) {
            const avatarImage = avatarEditorRef.current.getImageScaledToCanvas();
            avatarImage.toBlob(blob => {
                var formData = new FormData();
                formData.append('avatarImage', blob);
                dispatch(onSave(formData));
                onSaveEnd();
            });
        }
    };

    /* Pass changed image to parent component */
    const handleImageChange = () => {
        const avatarEditor = avatarEditorRef.current;
        if (avatarEditor) {
            const isDefaultImage = !selectedImg || !image;
            if (!isDefaultImage) {
                const imageDataURL = avatarEditor
                    .getImage()
                    .toDataURL('image/png');
                const canvasImageScaled = avatarEditor
                    .getImageScaledToCanvas();
                return canvasImageScaled
                    .toBlob(blob => onChange({ blob, imageDataURL }));
            }   
        }
    };

    /* Handle rotate change */
    const [degree, setDegree] = useState(0);
    const handleRotate = degree => {
        setDegree(degree);
        handleImageChange();
    };

    /* Handle zoom change */
    const [zoom, setZoom] = useState(1);
    const handleZoom = zoom => {
        setZoom(zoom);
        handleImageChange();
    };
    // Convert zoom value (1-2) to slider's value (0-100)
    const slidersValue = (zoom - 1) * 100;

    const displayImage = selectedImg || image || Helper.NO_IMAGE();
    const hasImage = image || selectedImg;
// FIXME - Fix delay on action
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
                    ref={avatarEditorRef}
                    image={displayImage}
                    borderRadius={200}
                    border={50}
                    color={[255, 255, 255, 0.9]}
                    scale={zoom}
                    rotate={degree}
                    onImageChange={handleImageChange}
                    onPositionChange={handleImageChange}
                    onLoadSuccess={handleImageChange}
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