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
  const contentStyle = {
    img: {
      maxWidth: '100%',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
    },
  };

  return (
    <Container>
      <Row sm={10} className="pb-3">
        <Col xs={10}>
          <h1>About Me</h1>
        </Col>
        <Col xs={2}>
          <Container className="p-0">
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
      <Row sm={10} style={{ wordWrap: 'break-word' }} className="ml-0">
        <ReactMarkdown
          source={props.description}
          escapeHtml={false}
          css={contentStyle}
        />
      </Row>
    </Container>
  );
};

export { AboutDisplay };
