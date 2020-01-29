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
            type: 'Fish'
        },
        {
            id: '5',
            type: 'Lizard'
        },
        {
            id: '6',
            type: 'Insect'
        },
        {
            id: '7',
            type: 'Rabbit'
        },
        {
            id: '8',
            type: 'Bird'
        }
    ];

    const [typeId, setTypeId] = useState(null);

    const handleTypeClick = id => {
        const type = types.filter(t => t.id === id)[0];
        onTypeChange(type);
        setTypeId(id);
    };

    const getIcon = type => {
        return `/category/${type.toLowerCase()}.png`;
    };

    return (
        <React.Fragment>
            <Typography variant='caption' gutterBottom>
                Pet Type
            </Typography>
            <div className={classes.wrapper}>
                {types.map(({ id, type }) =>
                    <Box key={id} m={1} bgcolor={id === typeId ? 'primary.main' : 'transparent'}
                        onClick={() => handleTypeClick(id)}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        flexDirection='column'
                        width={80}
                        height={80}
                    >
                        {type && <img className={classes.categoryIcon} src={getIcon(type)} alt={type}/>}
                        <Typography variant='caption'>{type}</Typography>
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
    },
    categoryIcon: {
        width: '70%',
        opacity: .9
    }
});

export default withStyles(styles, { withTheme: true })(PetType);