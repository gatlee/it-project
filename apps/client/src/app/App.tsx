import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import './utility.css';
import SignUp from './signup';
import { PortfolioIndex } from './portfolio-shared/PortfolioIndex';
import CoolBackground from '../assets/CoolBackground.png';
import GradientBackground from '../assets/GradientBackground.png';
import AdminPage from './admin/AdminPage';
import PrivateRoute from './auth/PrivateRoute';
import AuthContextProvider from './auth/AuthContextProvider';
import { NotFound } from './NotFound';

// Note: Auth0ProviderWithHistory needs to be a child of BrowserRouter
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import { EditIndex } from './portfolio-shared/EditIndex';
import { GetStartedPage } from './admin/GetStartedPage';
import { LoggedInUserContextProvider } from './portfolio-shared/LoggedInUserContextProvider';
import 'typeface-roboto';
import { ManagePage } from './admin/ManagePage';

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
        <AuthContextProvider>
          <LoggedInUserContextProvider>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <PrivateRoute exact path="/admin" component={AdminPage} />
              <PrivateRoute exact path="/admin/manage" component={ManagePage} />
              <PrivateRoute path="/getstarted" component={GetStartedPage} />
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/u/:id">
                <PortfolioIndex />
              </Route>
              <PrivateRoute path="/edit" component={EditIndex} />
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </LoggedInUserContextProvider>
        </AuthContextProvider>
      </Auth0ProviderWithHistory>
    </Router>
  );
};

export default App;
