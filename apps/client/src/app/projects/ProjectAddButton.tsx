import React, { useState } from 'react';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { Button } from 'react-bootstrap';
import { ProjectItemEditor } from './ProjectItemEditor';

interface ProjectAddButton {
  onAdd: () => void;
}

const ProjectAddButton = (props: ProjectAddButton) => {
  //TODO Hook in context provider
  const username = 'test';
  const [editorOpen, setEditorOpen] = useState(false);
  const closeEditor = () => setEditorOpen(false);

  const handleSave = (title: string, description: string) => {
    const body = {
      name: title,
      description: description,
      content: 'Not Implemented',
      type: 'TextItem',
    };
    fetch(`/api/portfolio/${username}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(() => {
      props.onAdd();
      closeEditor();
    });
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
