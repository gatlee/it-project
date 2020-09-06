// References:
// https://www.youtube.com/watch?v=1rgeO_EbSGg&list=PLZ14qQz3cfJL6aoKZ_Ly7jiYrwi9ihviW
// https://auth0.com/blog/complete-guide-to-react-user-authentication/

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
  // Regarding environment variable naming: https://nx.dev/react/guides/environment-variables
  const domain = 'pure-and-lazy.au.auth0.com';
  const clientId = 'dvv0VQp1XRJGwhppPeUvMTTebM2zEDE8';

  const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
