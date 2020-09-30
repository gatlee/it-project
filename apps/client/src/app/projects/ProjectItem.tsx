import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { ProjectItemDisplay } from './ProjectItemDisplay';
import { ProjectItemEditor } from './editor/ProjectItemEditor';
import { deleteProjectItem, updateProjectItem } from './ProjectUtils';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  content: string;
  onUpdate: () => void;
}

const ProjectItem = (props: ProjectItem) => {
  const { getAccessTokenSilently } = useAuth0();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState(props.title);
  const [editorDescription, setEditorDescription] = useState(props.description);
  const [editorContent, setEditorContent] = useState(props.content);
  //TODO pull in body

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const handleSave = async () => {
    try {
      await updateProjectItem(
        editorTitle,
        editorDescription,
        editorContent,
        props.id,
        getAccessTokenSilently
      );
    } catch (e) {
      console.log(e);
    }
    setEditorOpen(false);
    props.onUpdate();
  };

  const handleDelete = async () => {
    try {
      await deleteProjectItem(props.id, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }

    props.onUpdate();
    setEditorOpen(false);
  };

  return (
    <>
      <ProjectItemEditor
        title={editorTitle}
        onTitleChange={setEditorTitle}
        description={editorDescription}
        onDescriptionChange={setEditorDescription}
        content={editorContent}
        onContentChange={setEditorContent}
        onCancel={handleCancel}
        onSave={handleSave}
        show={editorOpen}
      />
      <ProjectItemDisplay
        title={props.title}
        description={props.description}
        onOpenEditor={handleOpenEditor}
        onDelete={handleDelete}
      />
    </>
  );
};

export { ProjectItem };
