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
  const { _id: id, name: title, image, description } = props.itemInfo;
  const isPublic = !!props.itemInfo.public;
  const { getAccessTokenSilently } = useAuth0();

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const handleCancel = () => {
    setEditorOpen(false);
  };
  const handleOpenEditor = () => setEditorOpen(true);

  const { pathname } = useLocation();
  const contentURL = pathname + '/' + id;
  const handleSave = async (newInfo: PortfolioItem) => {
    setSaveButtonDisabled(true);
    try {
      await updateProjectItem(newInfo, id, getAccessTokenSilently);
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
        initialInfo={props.itemInfo}
        editorSaveButtonDisabled={editorSaveButtonDisabled}
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
