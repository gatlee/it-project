import React from 'react';
import { Container } from 'react-bootstrap';
import ReactMde from 'react-mde';

const EditorBody = () => {
  return (
    <Container fluid className="px-0 mx-0">
      <ReactMde />
    </Container>
  );
};

export { EditorBody };
