import React from 'react';
import { Container, Row } from 'react-bootstrap';

const About = () => {
  const containerStyle = {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '3vh',
  };

  return (
    <Container style={containerStyle}>
      <Row>
        <h1>Sup</h1>
      </Row>
    </Container>
  );
};

export { About };
