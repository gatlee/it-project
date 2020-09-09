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
  const [content, setContent] = useState(
    '# This is a header\n\nAnd this is a paragraph'
  );

  const containerStyle = {
    backgroundColor: 'white',
    padding: '3vh',
    overflow: 'auto',
  };

  const handleOpenEditor = () => setEditorOpen(true);
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSave = () => setEditorOpen(false);

  return (
    <Container className="my-3" style={containerStyle}>
      {editorOpen ? (
        <AboutEdit
          content={content}
          onSave={handleSave}
          onContentChange={handleContentChange}
        />
      ) : (
        <AboutDisplay
          onOpenEditor={handleOpenEditor}
          editable={props.editable}
          content={content}
        />
      )}
    </Container>
  );
};

export { About };
