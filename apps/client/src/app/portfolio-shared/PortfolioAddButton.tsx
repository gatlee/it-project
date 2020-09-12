import React, { useState } from 'react';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { Button } from 'react-bootstrap';
import { PortfolioItemEditor } from './PortfolioItemEditor';
import { useAuth0 } from '@auth0/auth0-react';

interface PortfolioAddButton {
  onAdd: () => void;
}

const PortfolioAddButton = (props: PortfolioAddButton) => {
  //TODO Hook in context provider
  const { user, getAccessTokenSilently } = useAuth0();
  //const username = 'test';
  const username = user.nickname;
  const [editorOpen, setEditorOpen] = useState(false);
  const closeEditor = () => setEditorOpen(false);

  const handleSave = async (title: string, description: string) => {
    const body = {
      name: title,
      description: description,
      content: 'Not Implemented',
      type: 'TextItem',
    };
    const token = await getAccessTokenSilently();
    await fetch(`/api/portfolio/${username}/create`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    props.onAdd();
    closeEditor();
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
