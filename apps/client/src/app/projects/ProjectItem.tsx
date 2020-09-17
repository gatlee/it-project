import React, { useState } from 'react';
import { ProjectItemEditor } from './ProjectItemEditor';
import { ProjectItemDisplay } from './ProjectItemDisplay';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  editable?: boolean;
  onUpdate: () => void;
}

const ProjectItem = (props: ProjectItem) => {
  // TODO: Hook in context provider
  const username = 'test';

  const [editorOpen, setEditorOpen] = useState(false);

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const handleSave = (title: string, description: string) => {
    const data = {
      type: 'TextItem',
      _id: props.id,
      name: title,
      description: description,
      __v: 0,
    };
    fetch(`/api/portfolio/${username}/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setEditorOpen(false);
      props.onUpdate();
    });
  };

  const handleDelete = () => {
    fetch(`/api/portfolio/${username}/${props.id}`, {
      method: 'DELETE',
    }).then((res) => {
      props.onUpdate();
      setEditorOpen(false);
    });
  };

  return editorOpen ? (
    <ProjectItemEditor
      title={props.title}
      description={props.description}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  ) : (
    <ProjectItemDisplay
      title={props.title}
      description={props.description}
      editable={props.editable}
      onOpenEditor={handleOpenEditor}
      onDelete={handleDelete}
    />
  );
};

export { ProjectItem };
