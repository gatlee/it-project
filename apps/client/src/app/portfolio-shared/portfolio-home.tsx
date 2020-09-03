import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { PortfolioNavBar } from './portfolio-nav-bar';

const PortfolioHome = () => {
  const { id } = useParams();

  return (
    <>
      <PortfolioNavBar />
      <Container>
        <Row>
          <h1>Your username is {id}</h1>
        </Row>
      </Container>
    </>
  );
};

export { PortfolioHome };
