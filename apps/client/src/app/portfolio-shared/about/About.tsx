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
  const [about, setAbout] = useState(
    '# This is a header\n\nAnd this is a paragraph'
  );

  const containerStyle = {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '3vh',
    overflow: 'auto',
  };

  const handleOpenEditor = () => setEditorOpen(true);
  const handleAboutChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbout(event.target.value);
  };

  const handleSave = () => setEditorOpen(false);

  return (
    <Container style={containerStyle}>
      {editorOpen ? (
        <AboutEdit
          about={about}
          onSave={handleSave}
          onAboutChange={handleAboutChange}
        />
      ) : (
        <AboutDisplay
          onOpenEditor={handleOpenEditor}
          editable={props.editable}
          about={about}
        />
      )}
    </Container>
  );
};

export { About };
