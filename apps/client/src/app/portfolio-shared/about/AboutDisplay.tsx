import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { Pencil } from 'react-bootstrap-icons';
import { EditContext } from '../EditContext';

interface AboutDisplay {
  description: string;
  onOpenEditor: () => void;
}

const AboutDisplay = (props: AboutDisplay) => {
  return (
    <Container>
      <Row sm={10}>
        <Col>
          <h1>About Me</h1>
        </Col>
        <Col sm="auto">
          <Container className="p-3">
            <EditContext.Consumer>
              {(editMode) =>
                editMode && (
                  <Pencil onClick={props.onOpenEditor} className="pointer" />
                )
              }
            </EditContext.Consumer>
          </Container>
        </Col>
      </Row>
      <Row sm={10} style={{ wordWrap: 'break-word' }} className="ml-1">
        <ReactMarkdown source={props.description} />
      </Row>
    </Container>
  );
};

export { AboutDisplay };
