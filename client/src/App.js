import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `rgb(105, 190, 105)`,
      contrastText: 'white'
    }
  },
  status: {
    danger: 'orange',
  },
  typography: {
    "fontFamily": "Comfortaa\", cursive, \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 600
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
            <Route exact path="/">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
