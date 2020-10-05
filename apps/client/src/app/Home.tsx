import React, { useEffect, useState } from 'react';
import { Message } from '@pure-and-lazy/api-interfaces';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { PromotionBox } from './homepage/PromotionBox';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';
import { Container } from 'react-bootstrap';

export const Home = () => {
  const [m, setMessage] = useState<Message>({ message: '' });
  const { isAuthenticated, isLoading } = useAuth0();
  // useAuth0 Hook: https://auth0.github.io/auth0-react/globals.html#useauth0

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return isLoading ? null : (
    <Container className="d-flex flex-column min-vh-100 p-0" fluid>
      <BackgroundContainer
        background={GradientBackground}
        style={{ textAlign: 'center' }}
      >
        <PromotionBox />
        <div>{isAuthenticated ? 'Signed In' : 'Not Signed In'}</div>
        <div>{m.message}</div>
        <Link to="/u/gkaw">
          <h2>Example</h2>
        </Link>
      </BackgroundContainer>
    </Container>
  );
};

export default Home;
