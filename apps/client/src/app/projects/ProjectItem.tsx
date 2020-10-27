import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectItemEditor } from './editor/ProjectItemEditor';
import { ProjectItemDisplay } from './ProjectItemDisplay';
import { deleteProjectItem, updateProjectItem } from './ProjectUtils';
import { PortfolioItem } from '@pure-and-lazy/api-interfaces';

interface ProjectItem {
  onUpdate: () => void;
  itemInfo: PortfolioItem;
}

const ProjectItem = (props: ProjectItem) => {
  const { _id: id, name: title, image, description, content } = props.itemInfo;
  const isPublic = !!props.itemInfo.public;
  const { getAccessTokenSilently } = useAuth0();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState(title);
  const [editorImage, setEditorImage] = useState(image);
  const [editorDescription, setEditorDescription] = useState(description);
  const [editorContent, setEditorContent] = useState(content);
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const { pathname } = useLocation();
  const contentURL = pathname + '/' + id;
  const handleSave = async () => {
    setSaveButtonDisabled(true);
    try {
      await updateProjectItem(
        editorTitle,
        editorImage,
        editorDescription,
        editorContent,
        id,
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
      await deleteProjectItem(id, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }

    props.onUpdate();
    setEditorOpen(false);
  };

  return (
    <>
      <ProjectItemEditor
        title={title}
        image={editorImage}
        onImageChange={setEditorImage}
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
        title={title}
        image={image}
        link={contentURL}
        description={description}
        onOpenEditor={handleOpenEditor}
        onDelete={handleDelete}
        isPublic={isPublic}
      />
    </>
  );
};

export { ProjectItem };
