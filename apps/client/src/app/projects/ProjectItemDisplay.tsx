import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { EditContext } from '../portfolio-shared/EditContext';

interface ProjectItemDisplay {
  title: string;
  description: string;
  onOpenEditor: () => void;
  onDelete: () => void;
}

// Card display that shows the project item
const ProjectItemDisplay = (props: ProjectItemDisplay) => {
  // Restricts description to 3 lines of text. Anything after gets shortened and gets ... appended
  const clamp: React.CSSProperties = {
    display: '-webkit-box',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
  const cardNew = {};
  return (
    <Col sm="4" className="py-2">
      <Card style={cardNew} className="h-100">
        <Card.Img variant="top" src="https://picsum.photos/180/100" />
        <Card.Body>
          <Card.Title>
            <strong>{props.title}</strong>
          </Card.Title>
          <Card.Text style={clamp}>{props.description}</Card.Text>
          <EditContext.Consumer>
            {(editMode) =>
              editMode && (
                <>
                  <Button onClick={props.onOpenEditor}>Edit</Button>
                  <Button onClick={props.onDelete}>Delete</Button>
                </>
              )
            }
          </EditContext.Consumer>
        </Card.Body>
      </Card>
    </Col>
  );
};

export { ProjectItemDisplay };
