import React, { useContext } from 'react';
import { PromotionBox } from './homepage/PromotionBox';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';
import { Container } from 'react-bootstrap';
import { AuthContext } from './auth/AuthContext';
import { Redirect } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export const Home = () => {
  // useAuth0 Hook: https://auth0.github.io/auth0-react/globals.html#useauth0
  const { isAuthenticated } = useAuth0();
  const { isLoaded, registrationComplete } = useContext(AuthContext);

  if (!isLoaded) {
    return null;
  }

  if (isAuthenticated && !registrationComplete) {
    return <Redirect to="/getstarted" />;
  }

  return (
    <Container className="d-flex flex-column min-vh-100 p-0" fluid>
      <BackgroundContainer
        background={GradientBackground}
        style={{ textAlign: 'center' }}
      >
        <PromotionBox />
      </BackgroundContainer>
    </Container>
  );
};

export default Home;
