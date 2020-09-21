import { Button, Container, Form } from 'react-bootstrap';
import React, { useState } from 'react';

interface ProjectItemEditor {
  title: string;
  description: string;
  onCancel: () => void;
  onSave: (title: string, description: string) => void;
}
const ProjectItemEditor = (props: ProjectItemEditor) => {
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
        <Form.Group controlId="formGroupTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={handleTitleChange} size="lg" value={title} />
        </Form.Group>
        <Form.Group controlId="formGroupDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Button onClick={handleSave}>Save</Button>
        <Button onClick={props.onCancel} variant="Secondary">
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export { ProjectItemEditor };
