import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const GetStartedButton = () => {
  return (
    <LinkContainer to="/signup" style={{ marginRight: '0.5vw' }}>
      <Button variant="primary">Get Started!</Button>
    </LinkContainer>
  );
};

export default GetStartedButton;
