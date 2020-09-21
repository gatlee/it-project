import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { AboutDisplay } from './AboutDisplay';
import { AboutEditor } from './AboutEditor';

interface About {
  editable?: boolean;
}

const About = (props: About) => {
  const [editorOpen, setEditorOpen] = useState(false);
  const [content, setContent] = useState(
    '# This is a header\n\nAnd this is a paragraph'
  );

  const containerStyle = {
    backgroundColor: 'white',
    overflow: 'auto',
  };

  const handleOpenEditor = () => setEditorOpen(true);
  const handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSave = () => setEditorOpen(false);

  return (
    <Container className="my-3 p-4" style={containerStyle}>
      {editorOpen ? (
        <AboutEditor
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
