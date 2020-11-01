import React from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { EditorBody } from './EditorBody';
import { ProjectItemImage } from './ProjectItemImage';
import {
  PortfolioItem,
  PortfolioItemValue,
} from '@pure-and-lazy/api-interfaces';
import { PrivacyToggle } from './PrivacyToggle';

interface ProjectItemEditor {
  initialInfo: PortfolioItem;
  infoState: PortfolioItem;
  onUpdateItem: (key: keyof PortfolioItem, value: PortfolioItemValue) => void;
  editorSaveButtonDisabled: boolean;
  onCancel: () => void;
  onSave: () => void;
  show: boolean;
}

const ProjectItemEditor = (props: ProjectItemEditor) => {
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onUpdateItem('description', event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onUpdateItem('name', event.target.value);
  };

  const handleSave = () => {
    props.onSave();
  };

  const handleImageChange = (image: string) => {
    props.onUpdateItem('image', image);
  };

  const handleContentChange = (content: string) => {
    props.onUpdateItem('content', content);
  };

  const handlePublicChange = (newPublic: boolean) => {
    props.onUpdateItem('public', newPublic);
  };

  const { name, image, description, content } = props.infoState;
  const isPublic = props.infoState.public;
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
            <h2>
              {props.initialInfo.name === ''
                ? 'Create New'
                : `Edit ${props.initialInfo.name}`}
            </h2>
          </Col>
        </Row>
        <hr />
        <Row className="py-3">
          <Col xs={12} lg={4} xl={3}>
            <ProjectItemImage onImageChange={handleImageChange} image={image} />
          </Col>
          <Col xs={12} lg={8} xl={9}>
            <Form>
              <Form.Group controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={handleTitleChange}
                  size="lg"
                  value={name}
                />
              </Form.Group>
              <Form.Group controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={handleDescriptionChange}
                  style={{ minHeight: '100px' }}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="w-100 mx-0 py-3">
          <EditorBody content={content} onContentChange={handleContentChange} />
        </Row>
        <Row className="float-right">
          <Col sm="auto">
            <Button
              className="mx-1"
              onClick={props.onCancel}
              variant="outline-secondary"
            >
              Cancel
            </Button>
            <PrivacyToggle
              isPublic={isPublic}
              onPublicChange={handlePublicChange}
            />
            <Button
              disabled={props.editorSaveButtonDisabled}
              onClick={handleSave}
              className="ml-1"
            >
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export { ProjectItemEditor };
