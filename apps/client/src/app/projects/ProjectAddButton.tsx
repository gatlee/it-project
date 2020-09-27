import React, { useState } from 'react';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { Button } from 'react-bootstrap';
import { ProjectItemEditor } from './ProjectItemEditor';
import { useAuth0 } from '@auth0/auth0-react';
import { addProjectItem } from './ProjectUtils';

interface ProjectAddButton {
  onAdd: () => void;
}

const ProjectAddButton = (props: ProjectAddButton) => {
  const { getAccessTokenSilently } = useAuth0();
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorDescription, setEditorDescription] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const closeEditor = () => {
    setEditorOpen(false);
    setEditorTitle('');
    setEditorDescription('');
  };

  const handleSave = async () => {
    await addProjectItem(
      editorTitle,
      editorDescription,
      editorContent,
      getAccessTokenSilently
    );

    props.onAdd();
    closeEditor();
  };

  return (
    <>
      <CenteredRowContent>
        <Button size="lg" onClick={() => setEditorOpen(true)}>
          +
        </Button>
      </CenteredRowContent>
      <ProjectItemEditor
        title={editorTitle}
        onTitleChange={setEditorTitle}
        description={editorDescription}
        onDescriptionChange={setEditorDescription}
        content={editorContent}
        onContentChange={setEditorContent}
        onCancel={closeEditor}
        onSave={handleSave}
        show={editorOpen}
      />
    </>
  );
};

export { ProjectAddButton };
