import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const PetType = ({ classes }) => {

    const types = [
        {
            id: '1',
            type: 'Dog'
        },
        {
            id: '2',
            type: 'Cat'
        },
        {
            id: '3',
            type: 'Water animal'
        },
        {
            id: '4',
            type: 'Outdoor animal'
        },
        {
            id: '5',
            type: 'Reptile'
        },
        {
            id: '6',
            type: 'Insect'
        },
        {
            id: '7',
            type: 'Roddent'
        },
        {
            id: '8',
            type: 'Other'
        }
    ];

    return (
        <React.Fragment>
            <Typography variant='caption' gutterBottom>
                Pet Type
            </Typography>
            <div className={classes.wrapper}>
                {types.map(({ id, type }) =>
                    <Box key={id} m={1}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        flexDirection='row'
                        width={80}
                        height={80}
                        border={1}
                        borderColor='text.secondary'
                    >
                        <Typography variant='overline' align='center'>
                            {type}
                        </Typography>
                    </Box>
                )}
            </div>
        </React.Fragment>
    );
}

const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    }
});

export default withStyles(styles, { withTheme: true })(PetType);