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
    float: 'right',
  };

  return (
    <>
      {props.editable && (
        <Pencil onClick={props.onOpenEditor} style={pencilStyle} />
      )}
      <ReactMarkdown source={props.about} />
    </>
  );
};

export { AboutDisplay };
