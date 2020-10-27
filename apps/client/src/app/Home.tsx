import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { Container } from 'react-bootstrap';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';
import { PromotionBox } from './homepage/PromotionBox';

export const Home = () => {
  const { isLoading } = useAuth0();
  // useAuth0 Hook: https://auth0.github.io/auth0-react/globals.html#useauth0

  return isLoading ? null : (
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
