import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { PortfolioAvatar } from './PortfolioAvatar';

const PortfolioHome = () => {
  return (
    <Container>
      <Row>
        <Col className="m-5" style={{ textAlign: 'center' }}>
          <PortfolioAvatar />
        </Col>
      </Row>
    </Container>
  );
};

export { PortfolioHome };
