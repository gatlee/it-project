import { Form, Button } from 'react-bootstrap';
import React from 'react';

interface PortfolioItemEditor {
  title: string;
  description: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
}
const PortfolioItemEditor = (props: PortfolioItemEditor) => {
  return (
    <Form>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          onChange={props.onTitleChange}
          size="lg"
          value={props.title}
        />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          value={props.description}
          onChange={props.onDescriptionChange}
        />
      </Form.Group>
      <Button onClick={props.onCancel}>Cancel</Button>
    </Form>
  );
};

export { PortfolioItemEditor };
