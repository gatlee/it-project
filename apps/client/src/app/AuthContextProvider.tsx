import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuth0Api from './api/useAuth0Api';
import { AuthContext } from './AuthContext';

// Note: AuthContextProvider needs to be a child of Auth0ProviderWithHistory
export const AuthContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  const { getRegistrationStatusWithCache } = useAuth0Api();
  const [authData, setAuthData] = useState(useContext(AuthContext));

  useEffect(() => {
    if (isAuthenticated) {
      getRegistrationStatusWithCache()
        .then((registrationStatus) => {
          setAuthData((prevState) => ({
            ...prevState,
            registrationComplete: registrationStatus,
            isLoaded: true,
          }));
        })
        .catch((e) => console.log(e));
    }
  }, [getRegistrationStatusWithCache, isAuthenticated]);

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
