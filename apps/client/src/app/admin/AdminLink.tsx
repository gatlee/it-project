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

  return (
    <Container className="m-1">
      <Row>
        <Col
          sm="auto"
          onMouseOver={handleMouseOver}
          onMouseLeave={handleMouseLeave}
        >
          <LinkContainer to={props.to}>
            {hover ? (
              <Button variant="link" className="pl-4">
                → {props.label}
              </Button>
            ) : (
              <Button variant="link">→ {props.label}</Button>
            )}
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
};

export { AdminLink };
