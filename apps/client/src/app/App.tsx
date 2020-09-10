import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './signup';
import { PortfolioIndex } from './portfolio-shared/PortfolioIndex';
import CoolBackground from '../assets/CoolBackground.png';
import GradientBackground from '../assets/GradientBackground.png';
import AdminPage from './AdminPage';
import PrivateRoute from './PrivateRoute';
import Auth0ProviderWithHistory from './Auth0ProviderWithHistory';
// Note: Auth0ProviderWithHistory needs to be a child of BrowserRouter

export const App = () => {
  // Backgrounds for home page and portfolio currently
  const imagesToPreload = [CoolBackground, GradientBackground];

  const cacheImages = () => {
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  useEffect(() => {
    cacheImages();
  });

  return (
    <Router>
      <Auth0ProviderWithHistory>
        <Switch>
          <PrivateRoute path="/admin" component={AdminPage} />
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
