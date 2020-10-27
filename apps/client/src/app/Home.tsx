import React, { useContext } from 'react';
// import { Message } from '@pure-and-lazy/api-interfaces';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { PromotionBox } from './homepage/PromotionBox';
import GradientBackground from '../assets/GradientBackground.png';
import { BackgroundContainer } from './BackgroundContainer';
import { Container } from 'react-bootstrap';
import { AuthContext } from './auth/AuthContext';

export const Home = () => {
  // const [m, setMessage] = useState<Message>({ message: '' });
  const { isAuthenticated } = useAuth0();
  // useAuth0 Hook: https://auth0.github.io/auth0-react/globals.html#useauth0
  const { isLoaded } = useContext(AuthContext);

  // useEffect(() => {
  //   fetch('/api')
  //     .then((r) => r.json())
  //     .then(setMessage);
  // }, []);

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
