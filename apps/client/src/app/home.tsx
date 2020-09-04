import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { Link } from 'react-router-dom';
import GetStartedButton from './buttons/GetStartedButton';
import SignInButton from './buttons/SignInButton';
import GradientBackground from '../assets/GradientBackground.png';

export const Home = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div
        style={{
          textAlign: 'center',
          backgroundImage: `url(${GradientBackground})`,
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
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
        <GetStartedButton />
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default Home;
