import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PortfolioHome } from './portfolio-shared/portfolio-home';
import SignUp from './signup';


export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/u/:id">
          <PortfolioHome />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
