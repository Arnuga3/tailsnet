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

class AdvancedAvatarEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgState: {
                _position: props.imageState.position || { x: 0, y: 0 },
                _degree: props.imageState.degree || 0,
                _zoom: props.imageState.zoom || 1
            },
            selectedImg: null
        };
        this.ref = React.createRef();
    }

    handleSelect = selectedImg => {
        const { onImageSelected } = this.props;
        this.setState({ selectedImg });
        onImageSelected(selectedImg);
    };

    handleSave = () => {
        if (this.ref) {
            const { dispatch, onSave, onSaveEnd } = this.props;
            const avatarImage = this.ref.getImageScaledToCanvas();
            avatarImage.toBlob(blob => {
                var formData = new FormData();
                formData.append('avatarImage', blob);
                dispatch(onSave(formData));
                onSaveEnd();
            });
        }
    };

    componentWillUnmount() {
        const { onChange } = this.props;
        if (this.ref.current) return this.ref.current
            .getImageScaledToCanvas()
            .toBlob(blob => {
                const { imgState } = this.state;
                onChange({
                    position: imgState._position,
                    degree: imgState._degree,
                    zoom: imgState._zoom,
                    blob
                });
            });
    }

    handlePositionChange = _position => {
        const { imgState } = this.state;
        this.setState({ imgState: { ...imgState, _position } });
    }

    handleRotate = _degree => {
        const { imgState } = this.state;
        this.setState({ imgState: { ...imgState, _degree } });
    }

    handleZoom = _zoom => {
        const { imgState } = this.state;
        this.setState({ imgState: { ...imgState, _zoom } });
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
                        scale={_zoom}
                        rotate={_degree}
                        position={_position}
                        onPositionChange={this.handlePositionChange}
                    />
                </div>
                <div className={classes.flexRow}>
                    <div className={classes.flexColumn}>
                        { 
                            hasImage &&
                            <AvatarZoomControls
                                value={_zoom}
                                onZoomChange={this.handleZoom}
                            />
                        }
                        <div className={classes.flexRow}>
                            {
                                hasImage &&
                                <React.Fragment>
                                    <AvatarRotateControls
                                        value={_degree}
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