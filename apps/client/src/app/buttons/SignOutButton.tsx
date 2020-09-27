import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const SignOutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      className="mr-2"
      variant="light"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
          // window.location.origin stores the domain of the current page/window
          // https://developer.mozilla.org/en-US/docs/Web/API/Location/origin
          // thus, logging out redirects to the origin.
        })
      }
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
