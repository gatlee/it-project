import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import ReactMarkdown from 'react-markdown/umd/react-markdown';

interface About {
  editable: boolean;
}

const About = (props: About) => {
  const containerStyle = {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '3vh',
    overflow: 'auto',
  };

  const input = '# This is a header\n\nAnd this is a paragraph';

  return (
    <Container style={containerStyle}>
      <Row>
        <Container style={{ overflow: 'auto' }}>
          {props.editable && <Pencil style={{ float: 'right' }} />}
          <ReactMarkdown source={input} />
        </Container>
      </Row>
    </Container>
  );
};

export { About };
