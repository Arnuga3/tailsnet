import { createMuiTheme } from '@material-ui/core/styles';

export const getThemeConfig = () => {
    return createMuiTheme({
        palette: {
            primary: {
                main: 'rgb(90, 175, 90)',
                contrastText: 'rgb(255,255,255)'
            },
            text: {
                primary: 'rgba(0,0,0,.75)',
                secondary: 'rgba(0,0,0,.25)'
            },
            secondary: {
                main: 'rgb(255,255,255)',
                contrastText: 'rgb(90, 175, 90)'
            }
        },
        status: {
            danger: 'orange'
        },
        typography: {
            fontFamily: 'Comfortaa", cursive, "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 14,
            fontWeightLight: 300,
            fontWeightRegular: 400,
            fontWeightMedium: 600
        }
    });
}