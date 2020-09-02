import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <h1>Hello World!</h1>
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
