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
    padding: '2vh',
  };

  const [editorOpen, setEditorOpen] = useState(false);
  const handleCancel = () => setEditorOpen(false);

  const handleOpenEditor = () => setEditorOpen(true);

  const foo = editorOpen ? (
    <PortfolioItemEditor onCancel={handleCancel} />
  ) : (
    <PortfolioItemDisplay
      title={props.title}
      description={props.description}
      editable={props.editable}
      onOpenEditor={handleOpenEditor}
    />
  );

  return <Container style={outerStyle}>{foo}</Container>;
};

export { PortfolioItem };
