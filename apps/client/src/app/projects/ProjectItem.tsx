import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { ProjectItemDisplay } from './ProjectItemDisplay';
import { ProjectItemEditor } from './ProjectItemEditor';
import { deleteProjectItem, updateProjectItem } from './ProjectUtils';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  onUpdate: () => void;
}

const ProjectItem = (props: ProjectItem) => {
  const { getAccessTokenSilently } = useAuth0();

  const [editorOpen, setEditorOpen] = useState(false);

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const handleSave = async (title: string, description: string) => {
    await updateProjectItem(
      title,
      description,
      props.id,
      getAccessTokenSilently
    );
    setEditorOpen(false);
    props.onUpdate();
  };

  const handleDelete = async () => {
    deleteProjectItem(props.id, getAccessTokenSilently);

    props.onUpdate();
    setEditorOpen(false);
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
      onOpenEditor={handleOpenEditor}
      onDelete={handleDelete}
    />
  );
};

export { ProjectItem };
