import React from 'react';
import { Form, Button } from 'react-bootstrap';

interface AboutEdit {
  about: string;
  onAboutChange: () => void;
  onSave: () => void;
}

const AboutEdit = (props) => {
  return (
    <Form>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Edit Markdown</Form.Label>
        <Form.Control
          onChange={props.onAboutChange}
          size="lg"
          value={props.about}
          as="textarea"
          style={{ height: '70vh' }}
        />
      </Form.Group>
      <Button onClick={props.onSave}>Save</Button>
    </Form>
  );
};

export { AboutEdit };
