import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const PortfolioPortfolio = () => {
  const { id } = useParams();
  return (
    <Container>
      <Row>
        <h1>{id}'s Portfolio</h1>
      </Row>
    </Container>
  );
};

export { PortfolioPortfolio };
