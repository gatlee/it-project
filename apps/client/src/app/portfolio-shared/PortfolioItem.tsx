import React, { useState } from 'react';
import { PortfolioItemEditor } from './PortfolioItemEditor';
import { PortfolioItemDisplay } from './PortfolioItemDisplay';
import { Container } from 'react-bootstrap';

interface PortfolioItem {
  title: string;
  description: string;
  editable?: boolean;
}

const PortfolioItem = (props: PortfolioItem) => {
  const outerStyle = {
    backgroundColor: 'white',
    marginTop: '20px',
    padding: '3vh',
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

  const foo = editorOpen ? (
    <PortfolioItemEditor
      title={title}
      description={description}
      onCancel={handleCancel}
      onTitleChange={handleTitleChange}
      onDescriptionChange={handleDescriptionChange}
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
