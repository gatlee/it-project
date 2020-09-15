import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import GetStartedButton from '../buttons/GetStartedButton';
import SignInButton from '../buttons/SignInButton';
import SignOutButton from '../buttons/SignOutButton';

const PromotionBox = () => {
  const titleStyle = {
    fontSize: '4em',
    fontFamily: 'Segoe UI Semibold',
    padding: '1vh 0 1vh 0',
  };

  const subtitleStyle = {
    fontSize: '2em',
    paddingBottom: '5vh',
  };

  return (
    <Container className="justify-content-md-center pt-5" fluid>
      <Row>
        <Col md={6} sm={10} className="py-3">
          <h1 style={titleStyle}>Pure &amp;&amp; Lazy</h1>
          <h2 style={subtitleStyle}>Create your own ePortfolio in minutes.</h2>
          <SignInButton />
          <SignOutButton />
          <GetStartedButton />
        </Col>
        <Col md={6} sm={10} className="py-3">
          <img
            width="250"
            src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
            alt="nx logo"
          />
        </Col>
      </Row>
    </Container>
  );
};

export { PromotionBox };
