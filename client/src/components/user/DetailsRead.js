import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Box, Button } from '@material-ui/core';
import Email from '@material-ui/icons/EmailOutlined';
import Cake from '@material-ui/icons/CakeOutlined';
import Edit from '@material-ui/icons/EditOutlined';

const DetailsRead = ({ user, onEdit }) => {
    const { title, name, surname, dob, email } = user;
    const formatDate = dateStr => {
        const date = new Date(dateStr);
        return date.toDateString();
    };
    return (
        <React.Fragment>
            <List>
                <ListItem>
                    <ListItemText primary={title}
                        primaryTypographyProps={{
                            variant: 'h4'
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={`${name} ${surname}`}
                        primaryTypographyProps={{
                            variant: 'h6'
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Cake color='secondary'/>
                    </ListItemIcon>
                    <ListItemText primary={formatDate(dob)}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Email color='secondary'/>
                    </ListItemIcon>
                    <ListItemText primary={email}/>
                </ListItem>
            </List>
            <Box display='flex' justifyContent='flex-end' mt={2}>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={onEdit}
                    startIcon={<Edit fontSize='small'/>}
                >
                     Edit
                </Button>
            </Box>
        </React.Fragment>
    );
};

export default DetailsRead;