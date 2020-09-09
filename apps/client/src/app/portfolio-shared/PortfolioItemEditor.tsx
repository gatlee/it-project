import { Form, Button, ButtonGroup, Container } from 'react-bootstrap';
import React, { useState } from 'react';

interface PortfolioItemEditor {
  title: string;
  description: string;
  onCancel: () => void;
  onSave: (title: string, description: string) => void;
}
const PortfolioItemEditor = (props: PortfolioItemEditor) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleSave = () => {
    props.onSave(title, description);
  };

  return (
    <Container
      style={{
        backgroundColor: 'white',
        borderRadius: '3px',
      }}
      className="p-5"
    >
      <Form>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={handleTitleChange} size="lg" value={title} />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <ButtonGroup>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={props.onCancel} variant="Secondary">
            Cancel
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export { PortfolioItemEditor };
