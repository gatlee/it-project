import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Container } from 'react-bootstrap';
import { AboutDisplay } from './AboutDisplay';
import { AboutEditor } from './AboutEditor';
import { updateDescription } from '../../admin/AdminUtils';

const About = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [editorOpen, setEditorOpen] = useState(false);
  const [content, setContent] = useState(
    '# This is a header\n\nAnd this is a paragraph'
  );

  const containerStyle = {
    backgroundColor: 'white',
    overflow: 'auto',
  };

  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleCancel = () => {
    setEditorOpen(false);
  };
  const handleOpenEditor = () => setEditorOpen(true);

  const handleSave = async (newInfo) => {
    setSaveButtonDisabled(true);
    try {
      await updateDescription(newInfo, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    setEditorOpen(false);
    setSaveButtonDisabled(false);
    //props.onUpdate();
  };

  return (
    <Container className="my-3 p-4" style={containerStyle}>
      <AboutEditor
        initialDescription={''}
        editorSaveButtonDisabled={editorSaveButtonDisabled}
        onCancel={handleCancel}
        onSave={handleSave}
        show={editorOpen}
      />
      {editorOpen ? (
        {
          /* <AboutEditor
          content={content}
          onSave={handleSave}
          onContentChange={handleContentChange}
        /> */
        }
      ) : (
        <AboutDisplay onOpenEditor={handleOpenEditor} content={content} />
      )}
    </Container>
  );
};

export { About };
