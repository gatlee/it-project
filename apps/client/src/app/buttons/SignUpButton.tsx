import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SignUpButton = () => {
  return (
    <LinkContainer to="/signup">
      <Button variant="primary">Sign Up!</Button>
    </LinkContainer>
  );
};

export default SignUpButton;
