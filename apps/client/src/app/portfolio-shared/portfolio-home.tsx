import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { PortfolioNavBar } from './portfolio-nav-bar';
import CoolBackground from '../../assets/CoolBackground.png';
import { BackgroundContainer } from '../BackgroundContainer';

const PortfolioHome = () => {
  const { id } = useParams();

  return (
    <BackgroundContainer background={CoolBackground}>
      <PortfolioNavBar />
      <Container>
        <Row>
          <h1>{id}'s ePortfolio</h1>
        </Row>
      </Container>
    </BackgroundContainer>
  );
};

export { PortfolioHome };
