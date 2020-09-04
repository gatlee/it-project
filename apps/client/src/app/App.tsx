import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './signup';
import { PortfolioIndex } from './portfolio-shared/PortfolioIndex';

import Auth0ProviderWithHistory from './Auth0ProviderWithHistory';

export const App = () => {
  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/u/:id">
            <PortfolioIndex />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Auth0ProviderWithHistory>
    </Router>
  );
};

export default App;
