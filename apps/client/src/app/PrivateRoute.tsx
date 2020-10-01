import React from 'react';
import { Route } from 'react-router-dom';
import { LoadingScreen } from './LoadingScreen';
import { withAuthenticationRequired } from '@auth0/auth0-react';
// A Higher Order Component that causes components to only load if user is authenticated

// Use PrivateRoute instead of <Route><Component /><Route> in App.tsx
// Pass the contained Component as a prop, i.e. <PrivateRoute component={Component} />
const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <LoadingScreen />,
    })}
    {...args}
  />
);

export default PrivateRoute;
