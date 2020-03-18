import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, IconButton, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import AvatarPreview from '../commons/avatar/AvatarPreview';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const PetProfileProps = ({ classes, petData }) => {
    const { id, name='', profile_image='', type='' } = petData;

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const getImage = str => {
        return `/image/${str}.jpg`;
    }; 

    return (
        <Card>
            <CardHeader
                avatar={<AvatarPreview image={getImage(profile_image)} label={name} size='medium'/>}
                title={name}
                subheader={type}
                action={
                <IconButton aria-label='settings'>
                    <MoreVertIcon onClick={handleExpandClick}/>
                </IconButton>
                }
            />
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <List component='nav' aria-label='main mailbox folders'>
                        <ListItem dense button component={Link} to={`/user/pets/${id}/wall`}>
                            <ListItemText primary='Posts'/>
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Following' />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary='Followers' />
                        </ListItem>
                        <ListItem dense button component={Link} to={`/user/pets/${id}/wall/settings`}>
                            <ListItemText primary='Settings' />
                        </ListItem>
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
};

const styles = theme => ({
    
});

export default withStyles(styles)(PetProfileProps);