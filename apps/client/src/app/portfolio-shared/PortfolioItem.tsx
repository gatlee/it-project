import React, { useState } from 'react';
import { PortfolioItemEditor } from './PortfolioItemEditor';
import { PortfolioItemDisplay } from './PortfolioItemDisplay';
import { Container } from 'react-bootstrap';

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  editable?: boolean;
}

const PortfolioItem = (props: PortfolioItem) => {
  // TODO: Hook in context provider
  const username = 'test';

  const outerStyle = {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '3vh',
    borderRadius: '3px',
  };

  const [editorOpen, setEditorOpen] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const handleCancel = () => setEditorOpen(false);
  const handleOpenEditor = () => setEditorOpen(true);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
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
      console.log(res);
    });
  };

  const foo = editorOpen ? (
    <PortfolioItemEditor
      title={title}
      description={description}
      onCancel={handleCancel}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
      onSave={handleSave}
    />
  ) : (
    <PortfolioItemDisplay
      title={title}
      description={description}
      editable={props.editable}
      onOpenEditor={handleOpenEditor}
    />
  );

  return <Container style={outerStyle}>{foo}</Container>;
};

export { PortfolioItem };
