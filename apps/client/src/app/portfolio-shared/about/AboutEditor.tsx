import React, { useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { EditorBody } from '../../projects/editor/EditorBody';
import {
  PortfolioItem,
  PortfolioItemValue,
  UserProfile,
} from '@pure-and-lazy/api-interfaces';

interface AboutEditor {
  initialDescription: string;
  editorSaveButtonDisabled: boolean;
  onCancel: () => void;
  onSave: (newInfo: string) => void;
  show: boolean;
}

const AboutEditor = (props: AboutEditor) => {
  const [info, setInfo] = useState(props.initialDescription);

  const handleContentChange = (content: string) => {
    setInfo(content);
  };

  const handleSave = () => {
    setInfo(props.initialDescription);
    props.onSave(info);
  };

  const handleCancel = () => {
    setInfo(props.initialDescription);
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
            <h2>About You</h2>
          </Col>
        </Row>

        <Row className="w-100 mx-0 py-3">
          <EditorBody content={info} onContentChange={handleContentChange} />
        </Row>
        <Row>
          <Col>
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

export { AboutEditor };
