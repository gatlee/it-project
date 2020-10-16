import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface AdminLink {
  label: string;
  to: string;
}

const AdminLink = (props: AdminLink) => {
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const textStyle = {
    font: 'Roboto',
    fontWeight: 500,
    '@media (max-width: 992px)': {
      fontSize: 22,
    },
    '@media (min-width: 992px)': {
      fontSize: 36,
    },
  };

  return (
    <Container className="m-1">
      <Row>
        <Col
          sm="auto"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
          className="pointer"
        >
          <LinkContainer to={props.to}>
            {hover ? (
              <span className="pl-4" css={textStyle}>
                → {props.label}
              </span>
            ) : (
              <span css={textStyle}>→ {props.label}</span>
            )}
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export { AdminLink };
