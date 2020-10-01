import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const GetStartedButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="primary" className="mr-2" onClick={loginWithRedirect}>
      Get Started!
    </Button>
  );
};

export default GetStartedButton;
