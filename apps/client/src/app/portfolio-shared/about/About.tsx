import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { AboutDisplay } from './AboutDisplay';
import { AboutEdit } from './AboutEdit';

interface About {
  editable: boolean;
}

const About = (props: About) => {
  const [editorOpen, setEditorOpen] = useState(false);

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
        {editorOpen ? (
          <AboutEdit />
        ) : (
          <AboutDisplay editable={props.editable} input={input} />
        )}
      </Row>
    </Container>
  );
};

export { About };
