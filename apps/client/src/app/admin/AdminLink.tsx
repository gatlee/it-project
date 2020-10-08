import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface AdminLink {
  label: string;
  to: string;
}

const AdminLink = (props: AdminLink) => {
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    console.log('I CLICKED MATE');
  };

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const textStyle = {
    fontFamily: 'Roboto',
    fontSize: 36,
    fontWeight: 500,
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
