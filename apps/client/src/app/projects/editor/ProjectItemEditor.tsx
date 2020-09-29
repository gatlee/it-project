import React from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from 'react-bootstrap';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { EditorBody } from './EditorBody';

interface ProjectItemEditor {
  title: string;
  onTitleChange: (title: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  content: string;
  onContentChange: (content: string) => void;
  onCancel: () => void;
  onSave: () => void;
  show: boolean;
}
const ProjectItemEditor = (props: ProjectItemEditor) => {
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onDescriptionChange(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onTitleChange(event.target.value);
  };

  const handleSave = () => {
    props.onSave();
  };

  return (
    <Modal show={props.show} centered dialogClassName="modal-xl">
      <Container
        style={{
          backgroundColor: 'white',
          borderRadius: '3px',
        }}
        className="p-5"
        fluid
      >
        <Row>
          <Col>
            <h2>Edit Portfolio Item</h2>
          </Col>
        </Row>
        <Row className="py-3">
          <Col xs={12} sm={12} md={4}>
            <Image
              src="https://picsum.photos/180/180"
              fluid
              className="w-100 p-3"
            />
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Form>
              <Form.Group controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={handleTitleChange}
                  size="lg"
                  value={props.title}
                />
              </Form.Group>
              <Form.Group controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={props.description}
                  onChange={handleDescriptionChange}
                  style={{ minHeight: '100px' }}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="w-100 mx-0 py-3">
          <EditorBody
            content={props.content}
            onContentChange={props.onContentChange}
          />
        </Row>
        <Row>
          <Col>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={props.onCancel} variant="Secondary">
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export { ProjectItemEditor };