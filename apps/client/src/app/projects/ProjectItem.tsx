import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectItemEditor } from './editor/ProjectItemEditor';
import { ProjectItemDisplay } from './ProjectItemDisplay';
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
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const { pathname } = useLocation();
  const contentURL = pathname + '/' + props.id;
  const handleSave = async () => {
    setSaveButtonDisabled(true);
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
    setSaveButtonDisabled(false);
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
        title={props.title}
        editorTitle={editorTitle}
        editorSaveButtonDisabled={editorSaveButtonDisabled}
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
        link={contentURL}
        description={props.description}
        onOpenEditor={handleOpenEditor}
        onDelete={handleDelete}
      />
    </>
  );
};

export { ProjectItem };
