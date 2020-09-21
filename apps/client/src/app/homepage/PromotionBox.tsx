import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import GetStartedButton from '../buttons/GetStartedButton';
import SignInButton from '../buttons/SignInButton';
import SignOutButton from '../buttons/SignOutButton';
import AdminButton from '../buttons/AdminButton';
import DemoImage from '../../assets/PortfolioDemo.png';
import { css } from '@emotion/core';

const PromotionBox = () => {
  const titleStyle = {
    fontSize: '3.4em',
    fontFamily: 'Segoe UI Semibold',
    padding: '1vh 0 1vh 0',
  };

  const subtitleStyle = {
    fontSize: '1.7em',
    paddingBottom: '8vh',
  };

  const imageStyle = {
    maxWidth: '700px',
    width: '100%',
    imageRendering: '-webkit-optimize-contrast' as const,
  };

  const containerStyle = {
    paddingBottom: '5vh',
    '@media (max-width: 992px)': {
      paddingTop: '5vh',
    },
    '@media (min-width: 992px)': {
      paddingTop: '20vh',
      fontSize: '20px',
    },
  };

  return (
    <Container
      className="d-flex justify-content-center"
      css={containerStyle}
      fluid
    >
      <Row>
        <Col lg={6} md={12} className="py-3 text-lg-left float-right">
          <h1 className="display-2" css={titleStyle}>
            Pure &amp;&amp; Lazy
          </h1>
          <h2 className="display-3" css={subtitleStyle}>
            Create your own ePortfolio in minutes.
          </h2>
          <SignInButton />
          <SignOutButton />
          <GetStartedButton />
          <AdminButton />
        </Col>

        <Col lg={6} md={12} className="py-3">
          <Image src={DemoImage} css={imageStyle} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export { PromotionBox };
