import React from 'react';
import { Container } from 'react-bootstrap';

interface PortfolioItem {
  title: string;
  description: string;
}

const PortfolioItem = (props: PortfolioItem) => {
  return (
    <Container style={{ backgroundColor: 'white' }}>
      <h1>{props.title}</h1>
      <i>{props.description}</i>
    </Container>
  );
};

export { PortfolioItem };
