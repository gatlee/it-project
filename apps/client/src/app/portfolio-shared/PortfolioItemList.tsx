import React, { useEffect, useState } from 'react';
import { Container, Row, Button, Col } from 'react-bootstrap';
import { PortfolioItem } from './PortfolioItem';
import { PortfolioItemEditor } from './PortfolioItemEditor';

const PortfolioItemList = () => {
  //TODO Supply this with some context provider
  const username = 'test';
  const editMode = true;

  const [items, setItems] = useState([]);
  const [newEditorOpen, setNewEditorOpen] = useState(false);

  useEffect(() => {
    console.log();
    fetch(`/api/portfolio/${username}/all`)
      .then((r) => r.json())
      .then((r) => setItems(r));
  }, []);

  //TODO: Neaten this up with its own component
  return (
    <Container fluid>
      {items.map((item) => (
        <Row className="mt-4">
          <PortfolioItem
            id={item._id}
            title={item.name}
            description={item.description}
            editable={editMode}
          />
        </Row>
      ))}
      <Row className="align-items-center mt-5">
        <Col></Col>
        <Col xs="auto">
          {newEditorOpen ? (
            <Container
              style={{
                backgroundColor: 'white',
                borderRadius: '3px',
              }}
              className="p-5"
            >
              <PortfolioItemEditor
                title=""
                description=""
                onTitleChange={() => {}}
                onCancel={() => setNewEditorOpen(false)}
                onDescriptionChange={(e) => console.log(e)}
                onSave={() => setNewEditorOpen(false)}
              />
            </Container>
          ) : (
            <Button size="lg" onClick={() => setNewEditorOpen(true)}>
              +
            </Button>
          )}
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export { PortfolioItemList };
