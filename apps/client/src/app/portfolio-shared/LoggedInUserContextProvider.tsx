import React, { useState, useCallback, useEffect } from 'react';
import { UserContext } from './UserContext';
import { useAuth0 } from '@auth0/auth0-react';

interface LoggedInUserContextProvider {
  children: React.ReactNode;
}

const LoggedInUserContextProvider = (props: LoggedInUserContextProvider) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    dateJoined: undefined,
    description: '',
  });

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const findUser = useCallback(async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      const response = await fetch(`/api/portfolio/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const js = await response.json();
      setUser(js);
    }
  }, [setUser, getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    findUser();
  }, [findUser]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export { LoggedInUserContextProvider };