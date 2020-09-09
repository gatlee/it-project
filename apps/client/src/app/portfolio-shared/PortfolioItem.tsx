import React, { useState } from 'react';
import { PortfolioItemEditor } from './PortfolioItemEditor';
import { PortfolioItemDisplay } from './PortfolioItemDisplay';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  editable?: boolean;
  onUpdate: () => void;
}

const PortfolioItem = (props: PortfolioItem) => {
  // TODO: Hook in context provider
  const username = 'test';

  const [editorOpen, setEditorOpen] = useState(false);

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const handleSave = (title: string, description: string) => {
    const data = {
      type: 'TextItem',
      _id: props.id,
      name: title,
      description: description,
      __v: 0,
    };
    fetch(`/api/portfolio/${username}/${props.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => {
      setEditorOpen(false);
      props.onUpdate();
    });
  };

  const foo = editorOpen ? (
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
    />
  );

  return foo;
};

export { PortfolioItem };
