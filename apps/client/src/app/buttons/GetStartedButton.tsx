import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const GetStartedButton = () => {
  return (
    <LinkContainer to="/admin">
      <Button variant="primary" className="mr-2">
        Get Started!
      </Button>
    </LinkContainer>
  );
};

export default GetStartedButton;
