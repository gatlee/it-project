import React, { useState } from 'react';
import { PortfolioItemEditor } from './PortfolioItemEditor';
import { PortfolioItemDisplay } from './PortfolioItemDisplay';
import { useAuth0 } from '@auth0/auth0-react';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  editable?: boolean;
  onUpdate: () => void;
}

const PortfolioItem = (props: PortfolioItem) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const username = user ? user.nickname : 'test';

  const [editorOpen, setEditorOpen] = useState(false);

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const handleSave = async (title: string, description: string) => {
    const data = {
      type: 'TextItem',
      _id: props.id,
      name: title,
      description: description,
      __v: 0,
    };

    let token: string;
    try {
      token = await getAccessTokenSilently();
    } catch (error) {
      token = '';
    }

    await fetch(`/api/portfolio/${username}/${props.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setEditorOpen(false);
    props.onUpdate();
  };

  const handleDelete = async () => {
    let token: string;
    try {
      token = await getAccessTokenSilently();
    } catch (error) {
      token = '';
    }

    await fetch(`/api/portfolio/${username}/${props.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    props.onUpdate();
    setEditorOpen(false);
  };

  return editorOpen ? (
    <PortfolioItemEditor
      title={props.title}
      description={props.description}
      onCancel={handleCancel}
      onSave={handleSave}
    />
  ) : (
    <PortfolioItemDisplay
      title={props.title}
      description={props.description}
      editable={props.editable}
      onOpenEditor={handleOpenEditor}
      onDelete={handleDelete}
    />
  );
};

export { PortfolioItem };
