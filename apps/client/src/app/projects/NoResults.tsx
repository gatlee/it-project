import React from 'react';
import { Container, Row } from 'react-bootstrap';

const NoResults = () => (
  <Container>
    <Row className="mt-3">
      <h1
        className="text-center m-auto display-4"
        css={{ font: 'Roboto', fontWeight: 600 }}
      >
        No results found
      </h1>
    </Row>
    <Row className="mt-5">
      <p className="text-center m-auto " css={{ font: 'Roboto' }}>
        Try using different keywords
      </p>
    </Row>
  </Container>
);

export { NoResults };
