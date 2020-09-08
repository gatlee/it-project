import React from 'react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { Pencil } from 'react-bootstrap-icons';

interface AboutDisplay {
  editable?: boolean;
  input: string;
  handleOpenEditor: () => void;
}

const AboutDisplay = (props: AboutDisplay) => {
  const pencilStyle: React.CSSProperties = {
    cursor: 'pointer',
    float: 'right',
  };

  return (
    <Container style={{ overflow: 'auto' }}>
      {props.editable && (
        <Pencil onClick={props.handleOpenEditor} style={pencilStyle} />
      )}
      <ReactMarkdown source={props.input} />
    </Container>
  );
};

export { AboutDisplay };
