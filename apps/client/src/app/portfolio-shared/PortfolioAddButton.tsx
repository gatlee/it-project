import { useAuth0 } from '@auth0/auth0-react';
import {
  PortfolioCategory,
  PortfolioItem,
} from '@pure-and-lazy/api-interfaces';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { ProjectItemEditor } from '../projects/editor/ProjectItemEditor';
import { addPortfolioItem } from '../projects/ProjectUtils';

interface ProjectAddButton {
  onAdd: () => void;
  category: PortfolioCategory;
}

// Add button at the bottom of projects tab and blog tab
const PortfolioAddButton = (props: ProjectAddButton) => {
  const { getAccessTokenSilently } = useAuth0();
  const initialInfo: PortfolioItem = {
    category: props.category,
    name: '',
    description: '',
    content: '',
    image: '',
  };

  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const closeEditor = () => {
    setEditorOpen(false);
    setSaveButtonDisabled(false);
  };

  const handleSave = async (info: PortfolioItem) => {
    setSaveButtonDisabled(true);
    try {
      await addPortfolioItem(info, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    props.onAdd();
    closeEditor();
  };

  const buttonText =
    props.category === PortfolioCategory.BLOG ? 'Add post' : 'Add project';
  return (
    <>
      <CenteredRowContent>
        <Button onClick={() => setEditorOpen(true)}>{buttonText}</Button>
      </CenteredRowContent>
      <ProjectItemEditor
        initialInfo={initialInfo}
        editorSaveButtonDisabled={editorSaveButtonDisabled}
        onCancel={closeEditor}
        onSave={handleSave}
        show={editorOpen}
      />
    </>
  );
};

export { PortfolioAddButton };
