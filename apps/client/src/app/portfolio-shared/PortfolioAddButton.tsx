import { useAuth0 } from '@auth0/auth0-react';
import {
  PortfolioCategory,
  PortfolioItem,
  PortfolioItemValue,
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

  const [info, setInfo] = useState(initialInfo);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const closeEditor = () => {
    setInfo(initialInfo);
    setEditorOpen(false);
    setSaveButtonDisabled(false);
  };

  const handleSave = async () => {
    setSaveButtonDisabled(true);
    try {
      await addPortfolioItem(info, getAccessTokenSilently);
    } catch (e) {
      console.log(e);
    }
    props.onAdd();
    closeEditor();
  };

  const handleUpdateItem = (
    key: keyof PortfolioItem,
    value: PortfolioItemValue
  ) => {
    setInfo({ ...info, [key]: value });
  };

  return (
    <>
      <CenteredRowContent>
        <Button size="lg" onClick={() => setEditorOpen(true)}>
          +
        </Button>
      </CenteredRowContent>
      <ProjectItemEditor
        initialInfo={initialInfo}
        infoState={info}
        onUpdateItem={handleUpdateItem}
        editorSaveButtonDisabled={editorSaveButtonDisabled}
        onCancel={closeEditor}
        onSave={handleSave}
        show={editorOpen}
      />
    </>
  );
};

export { PortfolioAddButton };
