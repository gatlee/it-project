import React, { useState } from 'react';
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
  editorSaveButtonDisabled: boolean;
  onCancel: () => void;
  onSave: (newInfo: PortfolioItem) => void;
  show: boolean;
}

const ProjectItemEditor = (props: ProjectItemEditor) => {
  const [info, setInfo] = useState(props.initialInfo);

  const handleUpdateItem = (
    key: keyof PortfolioItem,
    value: PortfolioItemValue
  ) => {
    // Update key value pair while preserving other values
    setInfo({ ...info, [key]: value });
  };

  const handlePublicChange = (newPublic: boolean) => {
    handleUpdateItem('public', newPublic);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleUpdateItem('description', event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleUpdateItem('name', event.target.value);
  };

  const handleImageChange = (image: string) => {
    handleUpdateItem('image', image);
  };

  const handleContentChange = (content: string) => {
    handleUpdateItem('content', content);
  };

  const handleSave = () => {
    props.onSave(info);
  };

  const handleCancel = () => {
    setInfo(props.initialInfo);
    props.onCancel();
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
            <h2>
              {props.initialInfo.name === ''
                ? 'Create New'
                : `Edit ${props.initialInfo.name}`}
            </h2>
          </Col>
        </Row>
        <Row className="py-3">
          <Col xs={12} sm={12} md={4}>
            <ProjectItemImage
              onImageChange={handleImageChange}
              image={info.image}
            />
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Form>
              <Form.Group controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  onChange={handleTitleChange}
                  size="lg"
                  value={info.name}
                />
              </Form.Group>
              <Form.Group controlId="formGroupDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={info.description}
                  onChange={handleDescriptionChange}
                  style={{ minHeight: '100px' }}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        <Row className="w-100 mx-0 py-3">
          <EditorBody
            content={info.content}
            onContentChange={handleContentChange}
          />
        </Row>
        <Row>
          <Col>
            <PrivacyToggle
              isPublic={info.public}
              onPublicChange={handlePublicChange}
            />
            <Button
              disabled={props.editorSaveButtonDisabled}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button onClick={handleCancel} variant="Secondary">
              Cancel
            </Button>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
};

export { ProjectItemEditor };
