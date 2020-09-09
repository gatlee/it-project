import React, { useState } from 'react';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { Button } from 'react-bootstrap';
import { PortfolioItemEditor } from './PortfolioItemEditor';

interface PortfolioAddButton {
  onAdd: () => void;
}

const PortfolioAddButton = (props: PortfolioAddButton) => {
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
    <PortfolioItemEditor
      title=""
      description=""
      onCancel={() => setEditorOpen(false)}
      onSave={handleSave}
    />
  );
};

export { PortfolioAddButton };
