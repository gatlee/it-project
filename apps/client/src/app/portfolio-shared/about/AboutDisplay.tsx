import React from 'react';
import { Container } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown/umd/react-markdown';
import { Pencil } from 'react-bootstrap-icons';

interface AboutDisplay {
  editable?: boolean;
  input: string;
}

const AboutDisplay = (props: AboutDisplay) => {
  const pencilStyle = {
    cursor: 'pointer',
    float: 'right',
  };

  return (
    <Container style={{ overflow: 'auto' }}>
      {props.editable && <Pencil style={pencilStyle} />}
      <ReactMarkdown source={props.input} />
    </Container>
  );
};

export { AboutDisplay };
