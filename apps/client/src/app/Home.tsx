import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { Link } from 'react-router-dom';
import GetStartedButton from './buttons/GetStartedButton';
import SignInButton from './buttons/SignInButton';
import SignOutButton from './buttons/SignOutButton';
import AdminButton from './buttons/AdminButton';
import LoadingScreen from './LoadingScreen';
import { useAuth0 } from '@auth0/auth0-react';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';

export const Home = () => {
  const [m, setMessage] = useState<Message>({ message: '' });
  const { isAuthenticated, isLoading } = useAuth0();
  // useAuth0 Hook: https://auth0.github.io/auth0-react/globals.html#useauth0

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <BackgroundContainer
      background={GradientBackground}
      style={{ textAlign: 'center' }}
    >
      <h1>Welcome to portfolio!</h1>
      <img
        width="450"
        src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
        alt="nx logo"
      />
      <Link to="/u/jdoe">
        <h2>Click here to be routed to foo's portfolio!</h2>
      </Link>
      <SignInButton />
      <SignOutButton />
      <AdminButton />
      <GetStartedButton />
      {isAuthenticated ? <div>Signed In</div> : <div>Not Signed In</div>}
      <div>{m.message}</div>
    </BackgroundContainer>
  );
};

export default Home;
