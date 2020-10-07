import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

interface AdminButton {
  label: string;
}

const AdminButton = (props: AdminButton) => {
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
          {hover ? (
            <Button variant="link" className="pl-4">
              → {props.label}
            </Button>
          ) : (
            <Button variant="link">→ {props.label}</Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export { AdminButton };
