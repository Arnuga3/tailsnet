import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import CreatePetProfile from './components/CreatePetProfile';

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
        <Switch>
          <Route exact path='/' render={props => <Home {...props} />} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/pet/create' component={CreatePetProfile} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
