import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';

interface PortfolioItemDisplay {
  title: string;
  description: string;
  editable?: boolean;
  onOpenEditor: () => void;
}

const PortfolioItemDisplay = (props: PortfolioItemDisplay) => {
  return (
    <Row sm={10}>
      <Col>
        <h1>{props.title}</h1>
        <i>{props.description}</i>
      </Col>
      <Col sm={'auto'}>
        <Container style={{ padding: '1vh' }}>
          {props.editable && <Pencil onClick={props.onOpenEditor} />}
        </Container>
      </Col>
    </Row>
  );
};

export { PortfolioItemDisplay };
