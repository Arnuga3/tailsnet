import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Login from './components/Login';
import Register from './components/Register';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `rgb(105, 190, 105)`,
      contrastText: 'rgb(255,255,255)'
    }
  },
  status: {
    danger: 'orange'
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
            <Route exact path="/" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
