import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PortfolioIndex } from './portfolio-shared/PortfolioIndex';

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/test">
          <h1>Hello World!</h1>
        </Route>
        <Route path="/u/:id">
          <PortfolioIndex />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
