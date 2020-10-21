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

const PromotionBox = () => {
  const { isAuthenticated } = useAuth0();
  const { name } = useContext(UserContext);

  const titleStyle = {
    fontSize: '3.4em',
    fontFamily: 'Segoe UI Semibold',
  };

  const subtitleStyle = {
    fontSize: '1.7em',
    paddingBottom: '14vh',
    '@media (max-width: 1200px)': {
      paddingBottom: '5vh',
    },
  };

  const imageStyle = {
    maxWidth: '700px',
    minWidth: '450px',
    width: '100%',
    imageRendering: '-webkit-optimize-contrast' as const,
    '@media (max-width: 576px)': {
      maxWidth: '215px',
      minWidth: '100px',
    },
  };

  const topMarginStyle = {
    margin: '0px',
    '@media (max-width: 992px)': {
      height: '5vh',
    },
    '@media (min-width: 992px)': {
      height: '25vh',
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
              <p> Welcome back, {name}!</p>
              <AdminButton />
              <SignOutButton />
            </>
          ) : (
            <>
              <GetStartedButton />
              <SignInButton />
            </>
          )}
        </Col>

        <Col lg={6} md={12} className="p-4 align-self-center">
          <Image
            src={DemoImage}
            css={imageStyle}
            className="shadow-lg d-none d-sm-block mx-auto"
            fluid
          />
          <Image
            src={MobileDemo}
            css={imageStyle}
            className="shadow-lg d-block d-sm-none mx-auto"
            fluid
          />
        </Col>
      </Row>
    </Container>
  );
};

export { PromotionBox };
