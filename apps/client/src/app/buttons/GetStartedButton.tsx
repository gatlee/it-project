import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";

const GetStartedButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button variant="primary" className="mr-2" onClick={() => loginWithRedirect({
      // eslint-disable-next-line @typescript-eslint/camelcase
      screen_hint: "signup",
    })}>
      Get Started!
    </Button>
  );
};

export default GetStartedButton;
