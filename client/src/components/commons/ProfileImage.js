import React from 'react';
import PAvatarEditor from './avatar/PAvatarEditor';

const ProfileImage = ({ dispatch, image }) => {
    return (
        <PAvatarEditor dispatch={dispatch} image={image}/>
    );
}

export default ProfileImage;