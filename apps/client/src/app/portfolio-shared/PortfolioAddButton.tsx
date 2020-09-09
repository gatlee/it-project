import React, { useState } from 'react';
import { CenteredRowContent } from '../layout/CenteredRowContent';
import { Button, Row } from 'react-bootstrap';
import { PortfolioItemEditor } from './PortfolioItemEditor';

interface PortfolioAddButton {}

const PortfolioAddButton = (props: PortfolioAddButton) => {
  const [editorOpen, setEditorOpen] = useState(false);

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
      onTitleChange={(e) => {console.log(e)}}
      onCancel={() => setEditorOpen(false)}
      onDescriptionChange={(e) => console.log(e)}
      onSave={() => setEditorOpen(false)}
    />
  );
};

export { PortfolioAddButton };
