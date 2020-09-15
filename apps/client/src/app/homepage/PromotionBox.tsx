import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GetStartedButton from '../buttons/GetStartedButton';
import SignInButton from '../buttons/SignInButton';
import SignOutButton from '../buttons/SignOutButton';

const PromotionBox = () => {
  return (
    <Container>
      <h1>Pure &amp;&amp; Lazy</h1>
      <img
        width="450"
        src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
        alt="nx logo"
      />

      <SignInButton />
      <SignOutButton />
      <GetStartedButton />
    </Container>
  );
};

export { PromotionBox };
