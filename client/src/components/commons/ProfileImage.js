import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import Image from '@material-ui/icons/Image';

const ProfileImage = ({ classes, image, description=true }) => {
    return (
        <React.Fragment>
            { description &&
                <Typography variant='caption' gutterBottom>
                    Profile Image
                </Typography>
            }
            {
                image
                ?
                    <img className={classes.image} src={image} alt=''/>
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
    image: {
        width: `${100}%`,
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
    }
});

export default withStyles(styles)(ProfileImage);