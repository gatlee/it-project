import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const PortfolioHome = () => {
  const { id } = useParams();

  return (
    <Container>
      <Row>
        <h1>{id}'s ePortfolio</h1>
      </Row>
    </Container>
  );
};

export { PortfolioHome };
