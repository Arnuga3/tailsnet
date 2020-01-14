import React, { useState } from 'react';
import PAvatarEditor from './generic/PAvatarEditor';
import { Button } from '@material-ui/core';
// TODO - Add image preview on top of button
const ProfileImage = ({ dispatch, image='test.jpg' }) => {
    const [edit, setEdit] = useState(false);
    return (
        !image || edit
        ?   <PAvatarEditor dispatch={dispatch} image={image}/>
        :   <Button onClick={() => setEdit(true)}>
                Edit Profile Image
            </Button>
    );
}

export default ProfileImage;