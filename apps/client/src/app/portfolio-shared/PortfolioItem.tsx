import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';

interface PortfolioItem {
  title: string;
  description: string;
}

const PortfolioItem = (props: PortfolioItem) => {
  const outerStyle = {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '2vh',
  };

  return (
    <Container style={outerStyle}>
      <Row sm={10}>
        <Col>
          <h1>{props.title}</h1>
          <i>{props.description}</i>
        </Col>
        <Col sm={'auto'}>
          <Container style={{ padding: '1vh' }}>
            <Pencil />
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export { PortfolioItem };
