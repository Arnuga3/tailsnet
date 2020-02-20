import React from 'react';
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

const defaultImgState = {
    position: { x: 0, y: 0 },
    degree: 0,
    zoom: 1
}

class AdvancedAvatarEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgState: { ...defaultImgState, ...this.props.imageState },
            selectedImg: null
        };
        this.ref = React.createRef();
    }

    handleSelect = selectedImg => {
        const { onImageSelected } = this.props;
        this.setState({ selectedImg, imgState: defaultImgState });
        if (onImageSelected) onImageSelected(selectedImg);
    };

    handleSave = () => {
        const editor = this.ref.current;
        if (editor) {
            const { dispatch, onSave, onSaveEnd } = this.props;
            const avatarImage = editor.getImageScaledToCanvas();
            avatarImage.toBlob(blob => {
                var formData = new FormData();
                formData.append('avatarImage', blob);
                dispatch(onSave(formData));
                onSaveEnd();
            });
        }
    };

    componentWillUnmount() {
        if (this.ref.current) {
            const { onChange } = this.props;
            const { imgState } = this.state;
            return this.ref.current
                .getImageScaledToCanvas()
                .toBlob(blob => {
                    onChange({
                        position: imgState.position,
                        degree: imgState.degree,
                        zoom: imgState.zoom,
                        blob
                    });
                });
        }
    }

    handlePositionChange = position => {
        const { imgState } = this.state;
        this.setState({ imgState: { ...imgState, position } });
    }

    handleRotate = degree => {
        const { imgState } = this.state;
        this.setState({ imgState: { ...imgState, degree } });
    }

    handleZoom = zoom => {
        const { imgState } = this.state;
        this.setState({ imgState: { ...imgState, zoom } });
    }

    render() {
        const {
            classes,
            actionButtons=true,
            onEdit,
            onCancel,
            label,
            image,
            isPreview
        } = this.props;

        const { imgState, selectedImg } = this.state;
        const displayImage = selectedImg || image || Helper.NO_IMAGE();
        const hasImage = image || selectedImg;
        const { position, zoom, degree } = imgState;
        
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
                    <ImageSelect onSelect={this.handleSelect}/>
                </div>
                <div className={classes.flexRow}>
                    <AvatarEditor
                        style={{   // Canvas
                            width: '100%', 
                            height: 'auto',
                            maxWidth: '250px'
                        }}
                        ref={this.ref}
                        image={displayImage}
                        borderRadius={200}
                        border={50}
                        color={[255, 255, 255, 0.9]}
                        scale={zoom}
                        rotate={degree}
                        position={position}
                        onPositionChange={this.handlePositionChange}
                    />
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.flexColumn}>
                        { 
                            hasImage &&
                            <AvatarZoomControls
                                value={zoom}
                                onZoomChange={this.handleZoom}
                            />
                        }
                        <div className={classes.flexRow}>
                            {
                                hasImage &&
                                <React.Fragment>
                                    <AvatarRotateControls
                                        value={degree}
                                        onRotateChange={this.handleRotate}
                                    />
                                    {
                                        actionButtons ?
                                        <React.Fragment>
                                            <Fab className={classes.iconButton}
                                                onClick={this.handleSave}
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