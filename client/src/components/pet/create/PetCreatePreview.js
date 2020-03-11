import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Cake from '@material-ui/icons/CakeOutlined';
import AvatarPreview from '../../commons/avatar/AvatarPreview';
import Helper from '../../../utils/Helper';

PetCreatePreview.propTypes = {
    classes: PropTypes.object,
    details: PropTypes.object.isRequired,
    avatar: PropTypes.object,
    size: PropTypes.string
};

const PetCreatePreview = ({ classes, details, avatar, size }) => {
    const { type, name, dob } = details;
    
    const dobDate = Helper.formatDate(dob);
    const sinceDob = Helper.getAgeString(dob);

    return (
        <div className={classes.wrapper}>
            <AvatarPreview label={name} image={avatar} size={size}/>
            <List>
                <ListItem>
                    <ListItemText primary={name}
                        primaryTypographyProps={{
                            variant: 'h4'
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={type}
                        primaryTypographyProps={{
                            variant: 'h6'
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Cake color='secondary'/>
                    </ListItemIcon>
                    <ListItemText primary={`${dobDate} (~ ${sinceDob})`}/>
                </ListItem>
            </List>
        </div>
    );
};

const styles = theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
});

export default withStyles(styles, { withTheme: true })(PetCreatePreview);