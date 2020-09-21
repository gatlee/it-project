import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const SignInButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      style={{ background: '#E5E5E5', marginRight: '0.5vw' }}
      variant="light"
      onClick={() => loginWithRedirect()}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
