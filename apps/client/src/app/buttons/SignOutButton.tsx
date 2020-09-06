import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const SignOutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      style={{ background: '#E5E5E5' }}
      variant="light"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
