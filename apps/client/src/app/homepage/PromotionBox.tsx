import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import GetStartedButton from '../buttons/GetStartedButton';
import SignInButton from '../buttons/SignInButton';
import SignOutButton from '../buttons/SignOutButton';
import DemoImage from '../../assets/PortfolioDemo.png';
import { Justify } from 'react-bootstrap-icons';
import { Auth0Context } from '@auth0/auth0-react';
import './PromotionBoxStyles.css';

const PromotionBox = () => {
  const containerStyle = {
    paddingTop: '10vh',
  };

  const titleStyle = {
    fontSize: '4rem',
    fontFamily: 'Segoe UI Semibold',
    padding: '1vh 0 1vh 0',
  };

  const subtitleStyle = {
    fontSize: '2rem',
    paddingBottom: '8vh',
  };

  const imageStyle = {
    maxWidth: '700px',
    width: '100%',
  };

  const buttonStyle = {
    display: 'inline',
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={containerStyle}
      fluid
    >
      <Row>
        <Col lg={6} md={12} className="py-3" id="title-column">
          <h1 style={titleStyle}>Pure &amp;&amp; Lazy</h1>
          <h2 style={subtitleStyle}>Create your own ePortfolio in minutes.</h2>
          <div id="buttons" style={buttonStyle}>
            <SignInButton />
            <SignOutButton />
            <GetStartedButton />
          </div>
        </Col>

        <Col lg={6} md={12} className="py-3">
          <Image src={DemoImage} style={imageStyle} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export { PromotionBox };
