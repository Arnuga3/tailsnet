import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

const PetType = ({ classes, onTypeChange }) => {

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

    const [typeId, setTypeId] = useState(null);

    const handleTypeClick = id => {
        const type = types.filter(t => t.id === id)[0];
        onTypeChange(type);
        setTypeId(id);
    };

    return (
        <React.Fragment>
            <Typography variant='caption' gutterBottom>
                Pet Type
            </Typography>
            <div className={classes.wrapper}>
                {types.map(({ id, type }) =>
                    <Box key={id} m={1}
                        onClick={() => handleTypeClick(id)}
                        bgcolor={id === typeId ? 'rgba(0,0,0,.1)' : 'transparent'}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        flexDirection='row'
                        width={80}
                        height={80}
                        border={1}
                        borderColor='secondary.main'
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