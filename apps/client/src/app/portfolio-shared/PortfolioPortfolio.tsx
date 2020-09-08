import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { PortfolioItem } from './PortfolioItem';

const PortfolioPortfolio = () => {
  return (
    <Container fluid>
      <Row>
        <PortfolioItem
          title="Worked at McDonalds"
          description="It was pretty cool I guess"
          editable
        />
      </Row>
      <Row>
        <PortfolioItem
          title="Worked at a grocery store"
          description="Not so cool but still kinda cool? "
        />
      </Row>
    </Container>
  );
};

export { PortfolioPortfolio };
