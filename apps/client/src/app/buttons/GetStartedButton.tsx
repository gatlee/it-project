import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const GetStartedButton = () => {
  return (
    <LinkContainer to="/signup" className="mr-2">
      <Button variant="primary">Get Started!</Button>
    </LinkContainer>
  );
};

export default GetStartedButton;
