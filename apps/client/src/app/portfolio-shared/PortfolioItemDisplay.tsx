import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

interface PortfolioItemDisplay {
  title: string;
  description: string;
  editable?: boolean;
  onOpenEditor: () => void;
  onDelete: () => void;
}

const PortfolioItemDisplay = (props: PortfolioItemDisplay) => {
  const outerStyle = {
    backgroundColor: 'white',
    borderRadius: '3px',
  };

  return (
    <Container style={outerStyle} className="p-5">
      <Row sm={10}>
        <Col>
          <h1>{props.title}</h1>
          <i>{props.description}</i>
        </Col>
        <Col sm={'auto'}>
          <Container style={{ padding: '1vh' }}>
            {props.editable && (
              <>
                <Pencil onClick={props.onOpenEditor} className="m-2 pointer" />
                <Trash
                  onClick={props.onDelete}
                  className="m-2 pointer"
                  color="red"
                />
              </>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export { PortfolioItemDisplay };
