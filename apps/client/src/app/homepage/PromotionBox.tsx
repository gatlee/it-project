import React, { useContext } from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import GetStartedButton from '../buttons/GetStartedButton';
import SignInButton from '../buttons/SignInButton';
import SignOutButton from '../buttons/SignOutButton';
import AdminButton from '../buttons/AdminButton';
import DemoImage from '../../assets/PortfolioDemo.png';
import MobileDemo from '../../assets/MobileDemo.png';
import { useAuth0 } from '@auth0/auth0-react';
import { css } from '@emotion/core';
import { UserContext } from '../portfolio-shared/UserContext';
import { AuthContext } from "../auth/AuthContext";

const PromotionBox = () => {
  const { isAuthenticated } = useAuth0();
  const { registrationComplete} = useContext(AuthContext);
  const { name } = useContext(UserContext);

  const welcomeMessage = registrationComplete ? `Welcome back, ${name}!` : `Welcome back!`

  const titleStyle = {
    fontSize: '3.4em',
    fontFamily: 'Segoe UI Semibold',
  };

  const subtitleStyle = {
    fontSize: '1.7em',
    paddingBottom: '10vh',
  };

  const imageStyle = {
    maxWidth: '700px',
    width: '100%',
    imageRendering: '-webkit-optimize-contrast' as const,
  };

  const topMarginStyle = {
    margin: '0px',
    '@media (max-width: 992px)': {
      height: '5vh',
    },
    '@media (min-width: 992px)': {
      height: '20vh',
    },
  };

  const containerStyle = {
    minWidth: '75vw',
    marginBottom: '5vh',
    '@media (min-width: 576px)': {
      fontSize: '20px',
    },
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center"
      css={containerStyle}
    >
      <Row css={topMarginStyle} />
      <Row>
        <Col lg={6} md={12} className="py-3 text-lg-left">
          <h1 className="display-2 pb-2" css={titleStyle}>
            Pure &amp;&amp; Lazy
          </h1>
          <h2 className="display-4" css={subtitleStyle}>
            Create your own ePortfolio in minutes.
          </h2>

          {isAuthenticated ? (
            <>
              <p>{welcomeMessage}</p>
              <AdminButton />
              <SignOutButton />
            </>
          ) : (
            <>
              <p></p>
              <GetStartedButton />
              <SignInButton />
            </>
          )}
        </Col>

        <Col lg={6} md={12} className="p-4 align-self-center">
          <Image
            src={DemoImage}
            css={imageStyle}
            className="shadow-lg d-none d-lg-block"
            fluid
          />
          <Image
            src={MobileDemo}
            css={imageStyle}
            className="shadow-lg d-block d-lg-none"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export { PromotionBox };
