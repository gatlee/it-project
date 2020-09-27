import React, { useState } from 'react';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { Button } from 'react-bootstrap';
import { ProjectItemEditor } from './ProjectItemEditor';
import { useAuth0 } from '@auth0/auth0-react';

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
    //TODO Extract this out
    const body = {
      name: editorTitle,
      description: editorDescription,
      content: editorContent,
      type: 'TextItem',
    };

    let token: string;
    try {
      token = await getAccessTokenSilently();
    } catch (error) {
      token = '';
    }

    await fetch(`/api/portfolio/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

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
