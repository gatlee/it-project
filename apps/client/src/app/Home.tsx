import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { useAuth0 } from '@auth0/auth0-react';
import { PromotionBox } from './homepage/PromotionBox';
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
      <PromotionBox />
      <div>{isAuthenticated ? 'Signed In' : 'Not Signed In'}</div>
      <div>{m.message}</div>
      <Link to="/u/jdoe">
        <h2>Click here to be routed to foo's portfolio!</h2>
      </Link>
    </BackgroundContainer>
  );
};

export default Home;
