import React from 'react';
import { Form, Button } from 'react-bootstrap';

interface AboutEditor {
  content: string;
  onContentChange: () => void;
  onSave: () => void;
}

const AboutEditor = (props: AboutEditor) => {
  return (
    <Form>
      <Form.Group controlId="formGroupAbout">
        <Form.Label>Edit Markdown</Form.Label>
        <Form.Control
          onChange={props.onContentChange}
          size="lg"
          value={props.content}
          as="textarea"
          style={{ height: '68vh' }}
        />
      </Form.Group>
      <Button onClick={props.onSave}>Save</Button>
    </Form>
  );
};

export { AboutEditor };
