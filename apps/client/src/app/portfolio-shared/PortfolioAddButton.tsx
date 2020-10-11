import { useAuth0 } from '@auth0/auth0-react';
import { PortfolioCategory } from '@pure-and-lazy/api-interfaces';
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
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTitle, setEditorTitle] = useState('');
  const [editorImage, setEditorImage] = useState('');
  const [editorDescription, setEditorDescription] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [editorSaveButtonDisabled, setSaveButtonDisabled] = useState(false);

  const closeEditor = () => {
    setEditorOpen(false);
    setEditorTitle('');
    setEditorDescription('');
    setSaveButtonDisabled(false);
  };

  const handleSave = async () => {
    setSaveButtonDisabled(true);
    try {
      await addPortfolioItem(
        editorTitle,
        editorImage,
        editorDescription,
        editorContent,
        props.category,
        getAccessTokenSilently
      );
    } catch (e) {
      console.log(e);
    }
    props.onAdd();
    closeEditor();
  };

  return (
    <>
      <CenteredRowContent>
        <Button size="lg" onClick={() => setEditorOpen(true)}>
          +
        </Button>
      </CenteredRowContent>
      <ProjectItemEditor
        title=""
        imageUrl=""
        editorTitle={editorTitle}
        editorSaveButtonDisabled={editorSaveButtonDisabled}
        onTitleChange={setEditorTitle}
        description={editorDescription}
        onDescriptionChange={setEditorDescription}
        content={editorContent}
        onContentChange={setEditorContent}
        onCancel={closeEditor}
        onSave={handleSave}
        show={editorOpen}
      />
    </>
  );
};

export { PortfolioAddButton };
