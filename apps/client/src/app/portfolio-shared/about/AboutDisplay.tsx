import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { Pencil } from 'react-bootstrap-icons';

interface AboutDisplay {
  editable?: boolean;
  about: string;
  onOpenEditor: () => void;
}

const AboutDisplay = (props: AboutDisplay) => {
  const pencilStyle: React.CSSProperties = {
    cursor: 'pointer',
  };

  return (
    <Row sm={10}>
      <Col>
        <ReactMarkdown source={props.about} />
      </Col>
      <Col sm="auto">
        <Container style={{ padding: '1vh' }}>
          {props.editable && (
            <Pencil onClick={props.onOpenEditor} style={pencilStyle} />
          )}
        </Container>
      </Col>
    </Row>
  );
};

export { AboutDisplay };
