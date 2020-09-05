import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { Link } from 'react-router-dom';
import GetStartedButton from './buttons/GetStartedButton';
import SignInButton from './buttons/SignInButton';
import SignOutButton from './buttons/SignOutButton';
import { useAuth0 } from '@auth0/auth0-react';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';

export const Home = () => {
  const [m, setMessage] = useState<Message>({ message: '' });
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
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
      <Link to="/u/foo">
        <h2>Click here to be routed to foo's portfolio!</h2>
      </Link>
      <SignInButton />
      <SignOutButton />
      <GetStartedButton />
      <div>{isAuthenticated ? 'Signed In' : 'Not Signed In'}</div>
      <div>{m.message}</div>
    </BackgroundContainer>
  );
};

export default Home;
