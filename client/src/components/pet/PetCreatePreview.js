import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Cake from '@material-ui/icons/CakeOutlined';
import AvatarPreview from './../commons/avatarEditor/AvatarPreview';

// TODO: write props

const PetCreatePreview = ({ classes, details, avatar }) => {
    const { type, name, dob } = details;
    
    const formatDate = dateStr => {
        const date = new Date(dateStr);
        return date.toDateString();
    };

    const calcAge = date => {
        const today = new Date();
        const dob = new Date(date);
        const msDiff = today.getTime() - dob.getTime();
        let ageStr = '';
        
        const msYear = 365 * 86400000;
        
        const years = msDiff / msYear;
        const yearsRounded = Math.floor(years);

        const months = (years - yearsRounded) * 12;
        const monthsRounded = Math.floor(months);

        const weeks = (months - monthsRounded) * 4.3;
        const weeksRounded = Math.floor(weeks);

        if (yearsRounded > 0)
            ageStr += `${yearsRounded} y`;

        else if (yearsRounded < 1 && monthsRounded > 0)
            ageStr += `${monthsRounded} m`;

        else if (yearsRounded < 1 && monthsRounded < 1 && weeksRounded > 0)
            ageStr += `${weeksRounded} w`;

        return ageStr;
    };
    return (
        <div className={classes.wrapper}>
            <List>
                <ListItem>
                    <ListItemText primary={type}
                        primaryTypographyProps={{
                            variant: 'h4'
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemText primary={name}
                        primaryTypographyProps={{
                            variant: 'h6'
                        }}
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Cake color='secondary'/>
                    </ListItemIcon>
                    <ListItemText primary={`${formatDate(dob)} (~ ${calcAge(dob)})`}/>
                </ListItem>
            </List>
            <AvatarPreview label={name} image={avatar}/>
        </div>
    );
};

const styles = theme => ({
    wrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});

export default withStyles(styles, { withTheme: true })(PetCreatePreview);