import React from 'react';
import { Col, Container, Row, Image } from 'react-bootstrap';
import GetStartedButton from '../buttons/GetStartedButton';
import SignInButton from '../buttons/SignInButton';
import SignOutButton from '../buttons/SignOutButton';
import AdminButton from '../buttons/AdminButton';
import DemoImage from '../../assets/PortfolioDemo.png';
import { css } from 'emotion';

const PromotionBox = () => {
  const titleStyle = css`
    fontSize: '3.4em',
    fontFamily: 'Segoe UI Semibold',
    padding: '1vh 0 1vh 0',
  `;

  const subtitleStyle = css({
    fontSize: '1.7em',
    paddingBottom: '8vh',
  });

  const imageStyle = css({
    maxWidth: '700px',
    width: '100%',
    imageRendering: '-webkit-optimize-contrast' as const,
  });

  const containerStyle = css`
    padding-bottom: '5vh';
    @media (max-width: 992px) {
      padding-top: '5vh';
    }
    @media (min-width: 992px) {
      padding-top: 20vh;
      font-size: 20px;
    }
  `;

  const red = css`
    color: red;
  `;

  return (
    <Container
      className="d-flex justify-content-center"
      css={containerStyle}
      fluid
    >
      <Row>
        <Col lg={6} md={12} className="py-3 text-lg-left float-right">
          <h1
            className="display-2"
            css={css`
              ${titleStyle}
            `}
          >
            Pure &amp;&amp; Lazy
          </h1>
          <h2 className="display-3">Create your own ePortfolio in minutes.</h2>
          <SignInButton />
          <SignOutButton />
          <GetStartedButton />
          <AdminButton />
        </Col>

        <Col lg={6} md={12} className="py-3">
          <Image src={DemoImage} className={imageStyle + ' '} fluid />
        </Col>
      </Row>
    </Container>
  );
};

export { PromotionBox };
