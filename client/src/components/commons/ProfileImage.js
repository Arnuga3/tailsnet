import React from 'react';
import { Box, Typography } from '@material-ui/core';
import Image from '@material-ui/icons/Image';

const ProfileImage = ({ image }) => {
    return (
        <React.Fragment>
            <Typography variant='caption' gutterBottom>
                Profile Image
            </Typography>
            {
                image
                ?
                    <img src={image} alt=''/>
                :
                    <Box display="flex" justifyContent="center" alignItems='center' m={1} p={2}
                        width={150}
                        height={150}
                        border={1}
                        borderRadius='50%'
                        borderColor='text.secondary'
                    >
                        <Image color='disabled' fontSize='large'/>
                    </Box>               
            }
        </React.Fragment>
    );
}

export default ProfileImage;