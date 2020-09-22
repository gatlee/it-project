import React, { useState } from 'react';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { Button } from 'react-bootstrap';
import { ProjectItemEditor } from './ProjectItemEditor';
import { useAuth0 } from '@auth0/auth0-react';

interface ProjectAddButton {
  onAdd: () => void;
}

const ProjectAddButton = (props: ProjectAddButton) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const username = user ? user.nickname : 'test';
  const [editorOpen, setEditorOpen] = useState(false);
  const closeEditor = () => setEditorOpen(false);

  const handleSave = async (title: string, description: string) => {
    const body = {
      name: title,
      description: description,
      content: 'Not Implemented',
      category: 'projects',
    };

    let token: string;
    try {
      token = await getAccessTokenSilently();
    } catch (error) {
      token = '';
    }

    await fetch(`/api/portfolio/${username}/create`, {
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

  return !editorOpen ? (
    <CenteredRowContent>
      <Button size="lg" onClick={() => setEditorOpen(true)}>
        +
      </Button>
    </CenteredRowContent>
  ) : (
    <ProjectItemEditor
      title=""
      description=""
      onCancel={() => setEditorOpen(false)}
      onSave={handleSave}
    />
  );
};

export { ProjectAddButton };
