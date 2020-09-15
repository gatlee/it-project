import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { useAuth0 } from '@auth0/auth0-react';
import { PromotionBox } from './homepage/PromotionBox';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';
import { Link } from 'react-router-dom';

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
      <PromotionBox />
      <div>{isAuthenticated ? 'Signed In' : 'Not Signed In'}</div>
      <div>{m.message}</div>
      <Link to="/u/foo">
        <h2>Click here to be routed to foo's portfolio!</h2>
      </Link>
    </BackgroundContainer>
  );
};

export default Home;
