import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Index from './components/Index';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `rgb(90, 175, 90)`,
      contrastText: 'rgb(255,255,255)'
    }
  },
  status: {
    danger: 'orange'
  },
  typography: {
    fontFamily:
      'Comfortaa", cursive, "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Index/>
      </Router>
    </ThemeProvider>
  );
};

export default App;
