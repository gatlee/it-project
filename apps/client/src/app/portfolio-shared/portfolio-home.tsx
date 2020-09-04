import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { PortfolioNavBar } from './portfolio-nav-bar';
import CoolBackground from '../../assets/CoolBackground.png';

const PortfolioHome = () => {
  const { id } = useParams();

  const backgroundContainer = {
    backgroundImage: `url(${CoolBackground})`,
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div style={backgroundContainer}>
      <PortfolioNavBar />
      <Container>
        <Row>
          <h1>{id}'s ePortfolio</h1>
        </Row>
      </Container>
    </div>
  );
};

export { PortfolioHome };
