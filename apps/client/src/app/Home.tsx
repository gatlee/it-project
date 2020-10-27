import React, { useContext } from 'react';
import { PromotionBox } from './homepage/PromotionBox';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';
import { Container } from 'react-bootstrap';
import { AuthContext } from './auth/AuthContext';

export const Home = () => {
  // useAuth0 Hook: https://auth0.github.io/auth0-react/globals.html#useauth0
  const { isLoaded } = useContext(AuthContext);

  return isLoaded ? (
    <Container className="d-flex flex-column min-vh-100 p-0" fluid>
      <BackgroundContainer
        background={GradientBackground}
        style={{ textAlign: 'center' }}
      >
        <PromotionBox />
      </BackgroundContainer>
    </Container>
  ) : null;
};

export default Home;
