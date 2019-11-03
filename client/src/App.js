import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
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
  );
}

export default App;
